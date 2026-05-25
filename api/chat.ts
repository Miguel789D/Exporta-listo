import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// Tipos para el request
interface ChatRequest {
  mode: 'documentReview' | 'proposalWriter' | 'marketResearch';
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  stream?: boolean;
}

// Sistema de prompts para el copiloto exportador
const SYSTEM_PROMPTS: Record<ChatRequest['mode'], string> = {
  documentReview: `Eres un experto en comercio exterior peruano. Tu rol es revisar documentos comerciales
para exportación y asegurar que sean profesionales, claros y cumplan con estándares internacionales.
Responde siempre en español. Sé conciso y práctico.`,

  proposalWriter: `Eres un redactor experto en propuestas comerciales para exportación desde Perú.
Ayudas a MYPEs a escribir correos, propuestas y comunicaciones profesionales para compradores internacionales.
Usa un tono profesional pero accesible. Responde en español.`,

  marketResearch: `Eres un analista de mercados internacionales especializado en productos peruanos.
Ayudas a identificar oportunidades, analizar competencia y entender requisitos de mercados destino.
Basa tus respuestas en conocimiento actualizado de comercio internacional.`,
};

// Rate limiting simple (en producción usar Redis/Upstash)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests por minuto
const RATE_WINDOW = 60 * 1000; // 1 minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar API key del servidor
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY not configured on server');
    return res.status(500).json({ error: 'AI service not configured' });
  }

  // Rate limiting
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
                   req.socket?.remoteAddress ||
                   'unknown';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment.',
      retryAfter: 60
    });
  }

  try {
    const { mode, message, conversationHistory = [], stream = false } = req.body as ChatRequest;

    // Validación
    if (!mode || !SYSTEM_PROMPTS[mode]) {
      return res.status(400).json({ error: 'Invalid mode' });
    }

    if (!message || typeof message !== 'string' || message.length > 10000) {
      return res.status(400).json({ error: 'Invalid message' });
    }

    // Limitar historial de conversación
    const limitedHistory = conversationHistory.slice(-10);

    const openai = new OpenAI({ apiKey });

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPTS[mode] },
      ...limitedHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    if (stream) {
      // Streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const streamResponse = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      });

      for await (const chunk of streamResponse) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      // Non-streaming response
      const completion = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      const responseContent = completion.choices[0]?.message?.content;

      if (!responseContent) {
        return res.status(500).json({ error: 'No response from AI model' });
      }

      return res.status(200).json({
        success: true,
        message: responseContent,
      });
    }
  } catch (error) {
    console.error('OpenAI API error:', error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return res.status(500).json({ error: 'AI service authentication failed' });
      }
      if (error.status === 429) {
        return res.status(429).json({ error: 'AI service rate limited. Try again later.' });
      }
    }

    return res.status(500).json({ error: 'Failed to process request' });
  }
}
