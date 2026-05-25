import type { Question } from '@/types/diagnostic';

export const QUESTIONS: Question[] = [
  // ========================================
  // CATEGORÍA 1: PRODUCTO Y PROPUESTA DE VALOR (5 preguntas)
  // ========================================
  {
    id: 'prod_01',
    category: 'product',
    question: '¿Su producto/servicio se vende exitosamente en el mercado local?',
    options: [
      { value: 4, label: 'Sí, con ventas crecientes los últimos 3 años' },
      { value: 3, label: 'Sí, con ventas estables' },
      { value: 2, label: 'Sí, pero con ventas decrecientes' },
      { value: 1, label: 'Recién estamos comenzando' },
      { value: 0, label: 'No, aún no tenemos ventas significativas' },
    ],
    weight: 1.0,
    helpText: 'El éxito doméstico es un indicador clave de preparación para exportar.',
  },
  {
    id: 'prod_02',
    category: 'product',
    question: '¿Qué tan diferenciado es su producto respecto a la competencia internacional?',
    options: [
      { value: 4, label: 'Único/patentado, sin competencia directa' },
      { value: 3, label: 'Muy diferenciado con ventajas claras' },
      { value: 2, label: 'Algo diferenciado' },
      { value: 1, label: 'Similar a la competencia pero más económico' },
      { value: 0, label: 'No estoy seguro de cómo nos diferenciamos' },
    ],
    weight: 1.2,
  },
  {
    id: 'prod_03',
    category: 'product',
    question: '¿Su producto puede adaptarse a requisitos de mercados internacionales?',
    options: [
      { value: 4, label: 'Sí, ya tenemos versiones adaptadas' },
      { value: 3, label: 'Sí, con modificaciones menores (etiquetado, empaque)' },
      { value: 2, label: 'Requeriría modificaciones significativas' },
      { value: 1, label: 'Sería muy difícil adaptarlo' },
      { value: 0, label: 'No lo hemos evaluado' },
    ],
    weight: 1.0,
  },
  {
    id: 'prod_04',
    category: 'product',
    question: '¿Cuál es la vida útil/shelf life de su producto?',
    options: [
      { value: 4, label: 'Más de 1 año o no aplica (servicios)' },
      { value: 3, label: '6 meses a 1 año' },
      { value: 2, label: '3 a 6 meses' },
      { value: 1, label: '1 a 3 meses' },
      { value: 0, label: 'Menos de 1 mes (perecedero)' },
    ],
    weight: 0.8,
  },
  {
    id: 'prod_05',
    category: 'product',
    question: '¿Tiene marca registrada o propiedad intelectual protegida?',
    options: [
      { value: 4, label: 'Sí, registrada internacionalmente' },
      { value: 3, label: 'Sí, registrada en Perú (INDECOPI)' },
      { value: 2, label: 'En proceso de registro' },
      { value: 1, label: 'No, pero tenemos marca comercial' },
      { value: 0, label: 'No tenemos marca definida' },
    ],
    weight: 0.8,
  },

  // ========================================
  // CATEGORÍA 2: CAPACIDAD OPERATIVA (5 preguntas)
  // ========================================
  {
    id: 'ops_01',
    category: 'operations',
    question: 'Si recibiera un pedido de exportación que duplique su producción actual, ¿podría cumplirlo?',
    options: [
      { value: 4, label: 'Sí, tenemos capacidad ociosa significativa' },
      { value: 3, label: 'Sí, con ajustes menores (turnos extra)' },
      { value: 2, label: 'Requeriría inversión moderada' },
      { value: 1, label: 'Requeriría inversión significativa' },
      { value: 0, label: 'No podríamos cumplirlo' },
    ],
    weight: 1.2,
  },
  {
    id: 'ops_02',
    category: 'operations',
    question: '¿Tiene proveedores alternativos para sus insumos principales?',
    options: [
      { value: 4, label: 'Sí, múltiples proveedores calificados' },
      { value: 3, label: 'Sí, al menos uno alternativo por insumo clave' },
      { value: 2, label: 'Algunos insumos dependen de un solo proveedor' },
      { value: 1, label: 'La mayoría depende de proveedores únicos' },
      { value: 0, label: 'No hemos evaluado alternativas' },
    ],
    weight: 1.0,
  },
  {
    id: 'ops_03',
    category: 'operations',
    question: '¿Tiene sistemas de control de calidad documentados?',
    options: [
      { value: 4, label: 'Sí, certificados (ISO, HACCP, BPM, etc.)' },
      { value: 3, label: 'Sí, documentados pero sin certificación' },
      { value: 2, label: 'Controles informales pero consistentes' },
      { value: 1, label: 'Controles básicos esporádicos' },
      { value: 0, label: 'No tenemos controles de calidad' },
    ],
    weight: 1.1,
  },
  {
    id: 'ops_04',
    category: 'operations',
    question: '¿Cuál es su tiempo promedio de producción/entrega desde el pedido?',
    options: [
      { value: 4, label: 'Menos de 1 semana' },
      { value: 3, label: '1-2 semanas' },
      { value: 2, label: '2-4 semanas' },
      { value: 1, label: '1-2 meses' },
      { value: 0, label: 'Más de 2 meses' },
    ],
    weight: 0.9,
  },
  {
    id: 'ops_05',
    category: 'operations',
    question: '¿Tiene experiencia trabajando con operadores logísticos o agentes de carga?',
    options: [
      { value: 4, label: 'Sí, relaciones establecidas con varios' },
      { value: 3, label: 'Sí, hemos trabajado ocasionalmente' },
      { value: 2, label: 'Solo conocemos algunos por referencia' },
      { value: 1, label: 'Sabemos que existen pero nunca hemos contactado' },
      { value: 0, label: 'No sabemos cómo funcionan' },
    ],
    weight: 0.8,
  },

  // ========================================
  // CATEGORÍA 3: DOCUMENTACIÓN Y CUMPLIMIENTO (6 preguntas)
  // ========================================
  {
    id: 'doc_01',
    category: 'documentation',
    question: '¿Su empresa está formalmente registrada y al día con obligaciones tributarias?',
    options: [
      { value: 4, label: 'Sí, todo en regla y al día con SUNAT' },
      { value: 3, label: 'Sí, con algunas regularizaciones pendientes menores' },
      { value: 2, label: 'Registrada pero con obligaciones atrasadas' },
      { value: 1, label: 'En proceso de formalización' },
      { value: 0, label: 'Operamos informalmente' },
    ],
    weight: 1.3,
    critical: true,
    helpText: 'La formalización es requisito indispensable para exportar.',
  },
  {
    id: 'doc_02',
    category: 'documentation',
    question: '¿Tiene fichas técnicas documentadas de sus productos?',
    options: [
      { value: 4, label: 'Sí, completas y en múltiples idiomas' },
      { value: 3, label: 'Sí, completas en español' },
      { value: 2, label: 'Parciales o desactualizadas' },
      { value: 1, label: 'Información básica sin formato' },
      { value: 0, label: 'No tenemos documentación de producto' },
    ],
    weight: 1.1,
  },
  {
    id: 'doc_03',
    category: 'documentation',
    question: '¿Conoce los requisitos de certificación para exportar su producto?',
    options: [
      { value: 4, label: 'Sí, y ya cumplimos con las principales (SENASA, DIGESA, etc.)' },
      { value: 3, label: 'Sí, estamos en proceso de obtenerlas' },
      { value: 2, label: 'Tenemos idea general pero no específica' },
      { value: 1, label: 'Sabemos que existen pero no cuáles aplicarían' },
      { value: 0, label: 'No conocemos los requisitos' },
    ],
    weight: 1.2,
  },
  {
    id: 'doc_04',
    category: 'documentation',
    question: '¿Ha emitido facturas comerciales internacionales (invoices) antes?',
    options: [
      { value: 4, label: 'Sí, regularmente' },
      { value: 3, label: 'Sí, ocasionalmente' },
      { value: 2, label: 'Conocemos el formato pero nunca hemos emitido' },
      { value: 1, label: 'Tenemos idea de que es diferente' },
      { value: 0, label: 'No sabía que era diferente a una factura normal' },
    ],
    weight: 0.9,
  },
  {
    id: 'doc_05',
    category: 'documentation',
    question: '¿Conoce la clasificación arancelaria (código HS) de sus productos?',
    options: [
      { value: 4, label: 'Sí, validada con SUNAT/aduanas' },
      { value: 3, label: 'Sí, la hemos identificado' },
      { value: 2, label: 'Tenemos una aproximación' },
      { value: 1, label: 'Hemos escuchado del tema' },
      { value: 0, label: 'No sé qué es eso' },
    ],
    weight: 1.0,
  },
  {
    id: 'doc_06',
    category: 'documentation',
    question: '¿Tiene certificados de origen disponibles o sabe cómo obtenerlos?',
    options: [
      { value: 4, label: 'Sí, los gestionamos regularmente' },
      { value: 3, label: 'Sí, sabemos el proceso (Cámara de Comercio)' },
      { value: 2, label: 'Tenemos idea general del proceso' },
      { value: 1, label: 'Hemos escuchado que son necesarios' },
      { value: 0, label: 'No conozco sobre certificados de origen' },
    ],
    weight: 1.0,
  },

  // ========================================
  // CATEGORÍA 4: CAPACIDAD FINANCIERA (4 preguntas)
  // ========================================
  {
    id: 'fin_01',
    category: 'finance',
    question: '¿Tiene capital de trabajo para financiar una operación de exportación (90-120 días sin cobrar)?',
    options: [
      { value: 4, label: 'Sí, holgadamente' },
      { value: 3, label: 'Sí, aunque ajustado' },
      { value: 2, label: 'Requeriría financiamiento externo' },
      { value: 1, label: 'Sería muy difícil' },
      { value: 0, label: 'No, imposible actualmente' },
    ],
    weight: 1.3,
  },
  {
    id: 'fin_02',
    category: 'finance',
    question: '¿Tiene acceso a líneas de crédito o financiamiento bancario?',
    options: [
      { value: 4, label: 'Sí, líneas aprobadas disponibles' },
      { value: 3, label: 'Sí, buen historial crediticio para solicitar' },
      { value: 2, label: 'Acceso limitado pero posible' },
      { value: 1, label: 'Difícil acceso a financiamiento formal' },
      { value: 0, label: 'Sin acceso a financiamiento' },
    ],
    weight: 1.0,
  },
  {
    id: 'fin_03',
    category: 'finance',
    question: '¿Conoce sus costos reales de producción para calcular precios de exportación?',
    options: [
      { value: 4, label: 'Sí, costeo detallado y actualizado' },
      { value: 3, label: 'Sí, costeo general confiable' },
      { value: 2, label: 'Aproximaciones basadas en experiencia' },
      { value: 1, label: 'Solo costos directos, no indirectos' },
      { value: 0, label: 'No tenemos control de costos' },
    ],
    weight: 1.1,
  },
  {
    id: 'fin_04',
    category: 'finance',
    question: '¿Conoce los medios de pago internacionales (Cartas de Crédito, transferencias SWIFT)?',
    options: [
      { value: 4, label: 'Sí, los usamos regularmente' },
      { value: 3, label: 'Sí, los conocemos aunque no hemos usado' },
      { value: 2, label: 'Conocimiento básico' },
      { value: 1, label: 'He escuchado de ellos' },
      { value: 0, label: 'No sé cómo funcionan' },
    ],
    weight: 0.9,
  },

  // ========================================
  // CATEGORÍA 5: CONOCIMIENTO DE MERCADO (4 preguntas)
  // ========================================
  {
    id: 'mkt_01',
    category: 'market',
    question: '¿Ha identificado mercados objetivo para exportar?',
    options: [
      { value: 4, label: 'Sí, con estudio de mercado formal' },
      { value: 3, label: 'Sí, basado en investigación propia' },
      { value: 2, label: 'Tenemos ideas pero sin validar' },
      { value: 1, label: 'Cualquier mercado que aparezca' },
      { value: 0, label: 'No hemos pensado en mercados específicos' },
    ],
    weight: 1.1,
  },
  {
    id: 'mkt_02',
    category: 'market',
    question: '¿Conoce a sus competidores en mercados internacionales?',
    options: [
      { value: 4, label: 'Sí, análisis detallado de competencia' },
      { value: 3, label: 'Sí, conocemos los principales' },
      { value: 2, label: 'Conocimiento parcial' },
      { value: 1, label: 'Solo sabemos que existe competencia' },
      { value: 0, label: 'No hemos investigado la competencia' },
    ],
    weight: 1.0,
  },
  {
    id: 'mkt_03',
    category: 'market',
    question: '¿Tiene contactos o canales identificados en mercados destino?',
    options: [
      { value: 4, label: 'Sí, distribuidores/compradores interesados' },
      { value: 3, label: 'Sí, contactos iniciales establecidos' },
      { value: 2, label: 'Conocemos algunos canales posibles' },
      { value: 1, label: 'Solo ideas generales' },
      { value: 0, label: 'No tenemos ningún contacto' },
    ],
    weight: 1.0,
  },
  {
    id: 'mkt_04',
    category: 'market',
    question: '¿Ha participado en ferias comerciales o misiones comerciales?',
    options: [
      { value: 4, label: 'Sí, internacionales como expositor' },
      { value: 3, label: 'Sí, nacionales como expositor (Expoalimentaria, etc.)' },
      { value: 2, label: 'Como visitante solamente' },
      { value: 1, label: 'Nunca pero planeamos hacerlo' },
      { value: 0, label: 'No lo hemos considerado' },
    ],
    weight: 0.8,
  },

  // ========================================
  // CATEGORÍA 6: RECURSOS HUMANOS Y COMPROMISO (4 preguntas)
  // ========================================
  {
    id: 'hr_01',
    category: 'human_resources',
    question: '¿Hay compromiso de la gerencia/dueños para iniciar exportaciones?',
    options: [
      { value: 4, label: 'Sí, es prioridad estratégica con recursos asignados' },
      { value: 3, label: 'Sí, hay interés activo' },
      { value: 2, label: 'Interés moderado, si surge oportunidad' },
      { value: 1, label: 'Interés bajo, enfocados en mercado local' },
      { value: 0, label: 'No es prioridad actualmente' },
    ],
    weight: 1.2,
    critical: true,
    helpText: 'El compromiso gerencial es el factor más importante para el éxito exportador.',
  },
  {
    id: 'hr_02',
    category: 'human_resources',
    question: '¿Alguien en su equipo maneja inglés u otro idioma extranjero?',
    options: [
      { value: 4, label: 'Sí, fluidez para negociaciones en varios idiomas' },
      { value: 3, label: 'Sí, inglés funcional para negocios' },
      { value: 2, label: 'Inglés básico' },
      { value: 1, label: 'Muy limitado' },
      { value: 0, label: 'No, solo español' },
    ],
    weight: 1.0,
  },
  {
    id: 'hr_03',
    category: 'human_resources',
    question: '¿Tiene o puede asignar personal dedicado a comercio exterior?',
    options: [
      { value: 4, label: 'Sí, equipo dedicado existente' },
      { value: 3, label: 'Sí, al menos una persona puede dedicarse' },
      { value: 2, label: 'Sería tiempo parcial compartido' },
      { value: 1, label: 'El dueño tendría que hacerlo todo' },
      { value: 0, label: 'No hay capacidad para asignar recursos' },
    ],
    weight: 0.9,
  },
  {
    id: 'hr_04',
    category: 'human_resources',
    question: '¿Cuál es su expectativa de tiempo para ver resultados de exportación?',
    options: [
      { value: 4, label: '12+ meses, entendemos que es un proceso' },
      { value: 3, label: '6-12 meses' },
      { value: 2, label: '3-6 meses' },
      { value: 1, label: '1-3 meses' },
      { value: 0, label: 'Resultados inmediatos' },
    ],
    weight: 0.8,
    helpText: 'Expectativas realistas son clave para el éxito exportador.',
  },
];

export const getQuestionsByCategory = (categoryId: string): Question[] => {
  return QUESTIONS.filter(q => q.category === categoryId);
};

export const getQuestionById = (id: string): Question | undefined => {
  return QUESTIONS.find(q => q.id === id);
};

export const getTotalQuestions = (): number => {
  return QUESTIONS.length;
};
