/**
 * Servicio de IA para el Copiloto de ExportaListo
 *
 * Las llamadas a OpenAI se realizan a través del endpoint /api/chat
 * para proteger la API key en el servidor.
 */

export type CopilotMode = 'documentReview' | 'proposalWriter' | 'marketResearch';

interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface CopilotResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Verificar si la IA está disponible (en producción siempre lo está)
export const isAIAvailable = (): boolean => {
  // En desarrollo, verificar si hay endpoint disponible
  // En producción (Vercel), siempre está disponible
  return true;
};

/**
 * Envía un mensaje al copiloto de IA a través del endpoint seguro
 */
export async function sendToCopilot(
  mode: CopilotMode,
  userMessage: string,
  conversationHistory: CopilotMessage[] = []
): Promise<CopilotResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode,
        message: userMessage,
        conversationHistory,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 429) {
        return {
          success: false,
          message: '',
          error: 'Demasiadas solicitudes. Por favor espera un momento.',
        };
      }

      return {
        success: false,
        message: '',
        error: errorData.error || `Error del servidor (${response.status})`,
      };
    }

    const data = await response.json();

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error calling AI endpoint:', error);

    return {
      success: false,
      message: '',
      error: `Error de conexión: ${errorMessage}`,
    };
  }
}

/**
 * Streaming de respuestas del copiloto
 */
export async function* streamFromCopilot(
  mode: CopilotMode,
  userMessage: string,
  conversationHistory: CopilotMessage[] = []
): AsyncGenerator<string, void, unknown> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode,
        message: userMessage,
        conversationHistory,
        stream: true,
      }),
    });

    if (!response.ok) {
      yield 'Error: No se pudo conectar con el servicio de IA.';
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      yield 'Error: No se pudo iniciar el streaming.';
      return;
    }

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              yield parsed.content;
            }
          } catch {
            // Ignorar líneas que no son JSON válido
          }
        }
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    yield `Error: ${errorMessage}`;
  }
}

/**
 * Genera una propuesta comercial básica
 */
export async function generateProposal(
  productName: string,
  targetMarket: string,
  companyName: string
): Promise<CopilotResponse> {
  const prompt = `Genera una propuesta comercial breve para presentar el producto "${productName}"
al mercado de ${targetMarket}. La empresa se llama "${companyName}" y es una MYPE peruana.
Incluye: saludo, presentación breve de la empresa, descripción del producto, y llamado a la acción.
Máximo 200 palabras.`;

  return sendToCopilot('proposalWriter', prompt);
}

/**
 * Revisa un documento y sugiere mejoras
 */
export async function reviewDocument(
  documentContent: string,
  documentType: 'proforma' | 'techSheet' | 'email'
): Promise<CopilotResponse> {
  const typeLabels = {
    proforma: 'proforma invoice',
    techSheet: 'ficha técnica de producto',
    email: 'correo comercial',
  };

  const prompt = `Revisa el siguiente ${typeLabels[documentType]} y sugiere mejoras específicas
para hacerlo más profesional y efectivo para comercio internacional:

---
${documentContent}
---

Proporciona:
1. Evaluación general (1-10)
2. Puntos fuertes
3. Áreas de mejora específicas
4. Sugerencias concretas`;

  return sendToCopilot('documentReview', prompt);
}
