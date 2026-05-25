import type { Recommendation, Resource, CategoryId } from '@/types/diagnostic';

// Recursos por categoría para Perú
export const RESOURCES_BY_CATEGORY: Record<CategoryId, Resource[]> = {
  product: [
    {
      name: 'INDECOPI - Registro de Marcas',
      url: 'https://www.indecopi.gob.pe/marcas',
      description: 'Registro de marcas y propiedad intelectual en Perú',
    },
  ],
  operations: [
    {
      name: 'INACAL - Normas Técnicas',
      url: 'https://www.inacal.gob.pe/',
      description: 'Instituto Nacional de Calidad',
    },
    {
      name: 'PRODUCE - MiProducción',
      url: 'https://www.gob.pe/produce',
      description: 'Programas de mejora productiva para MYPE',
    },
  ],
  documentation: [
    {
      name: 'SUNAT - Operador de Comercio Exterior',
      url: 'https://www.sunat.gob.pe/',
      description: 'Portal de aduanas y comercio exterior',
    },
    {
      name: 'SENASA',
      url: 'https://www.senasa.gob.pe/',
      description: 'Certificaciones sanitarias para productos agrícolas',
    },
    {
      name: 'DIGESA',
      url: 'https://www.digesa.minsa.gob.pe/',
      description: 'Certificaciones sanitarias para alimentos procesados',
    },
    {
      name: 'Cámara de Comercio de Lima',
      url: 'https://www.camaralima.org.pe/',
      description: 'Certificados de origen y asesoría exportadora',
    },
  ],
  finance: [
    {
      name: 'COFIDE',
      url: 'https://www.cofide.com.pe/',
      description: 'Financiamiento para comercio exterior',
    },
    {
      name: 'SEPYMEX',
      url: 'https://www.sepymex.com/',
      description: 'Seguro de crédito a la exportación para PYME',
    },
  ],
  market: [
    {
      name: 'SIICEX - Inteligencia de Mercados',
      url: 'https://www.siicex.gob.pe/',
      description: 'Sistema Integrado de Información de Comercio Exterior',
    },
    {
      name: 'Trade Map',
      url: 'https://www.trademap.org/',
      description: 'Estadísticas de comercio internacional',
    },
  ],
  human_resources: [
    {
      name: 'ADEX - Escuela de Negocios',
      url: 'https://www.adexperu.edu.pe/',
      description: 'Formación especializada en exportaciones',
    },
  ],
};

// Recomendaciones por tipo de gap
export const GAP_RECOMMENDATIONS: Record<string, Recommendation[]> = {
  // Producto
  'low_differentiation': [
    {
      action: 'Realizar análisis de valor agregado y diferenciación',
      priority: 1,
      timeframe: '2-4 semanas',
    },
    {
      action: 'Identificar certificaciones de calidad que agreguen valor',
      priority: 2,
      timeframe: '1-2 meses',
    },
  ],
  'no_brand': [
    {
      action: 'Desarrollar identidad de marca exportable',
      priority: 1,
      timeframe: '1-2 meses',
    },
    {
      action: 'Registrar marca en INDECOPI',
      priority: 2,
      timeframe: '3-6 meses',
    },
  ],
  'product_not_adaptable': [
    {
      action: 'Evaluar requisitos de adaptación por mercado objetivo',
      priority: 1,
      timeframe: '2-4 semanas',
    },
    {
      action: 'Consultar con PROMPERÚ sobre requisitos específicos',
      priority: 2,
      timeframe: '1-2 semanas',
    },
  ],

  // Operaciones
  'low_capacity': [
    {
      action: 'Evaluar opciones de escalamiento (turnos, tercerización)',
      priority: 1,
      timeframe: '2-4 semanas',
    },
    {
      action: 'Identificar cuellos de botella en producción',
      priority: 2,
      timeframe: '1-2 semanas',
    },
  ],
  'no_quality_control': [
    {
      action: 'Implementar controles de calidad básicos documentados',
      priority: 1,
      timeframe: '1-2 meses',
    },
    {
      action: 'Evaluar certificación ISO/HACCP según aplique',
      priority: 2,
      timeframe: '3-6 meses',
    },
  ],
  'no_logistics_experience': [
    {
      action: 'Contactar agentes de carga recomendados por PROMPERÚ',
      priority: 1,
      timeframe: '1-2 semanas',
    },
    {
      action: 'Solicitar cotizaciones de diferentes operadores logísticos',
      priority: 2,
      timeframe: '2-3 semanas',
    },
  ],

  // Documentación
  'not_formalized': [
    {
      action: 'Completar formalización empresarial con SUNAT',
      priority: 1,
      timeframe: '2-4 semanas',
    },
    {
      action: 'Regularizar obligaciones tributarias pendientes',
      priority: 2,
      timeframe: '1-2 meses',
    },
  ],
  'no_tech_sheets': [
    {
      action: 'Desarrollar fichas técnicas completas de productos',
      priority: 1,
      timeframe: '2-3 semanas',
    },
    {
      action: 'Traducir fichas técnicas al inglés',
      priority: 2,
      timeframe: '1-2 semanas',
    },
  ],
  'no_hs_code': [
    {
      action: 'Identificar partida arancelaria en SUNAT',
      priority: 1,
      timeframe: '1 semana',
    },
    {
      action: 'Validar clasificación con un agente de aduanas',
      priority: 2,
      timeframe: '1-2 semanas',
    },
  ],
  'no_certifications': [
    {
      action: 'Identificar certificaciones requeridas (SENASA/DIGESA)',
      priority: 1,
      timeframe: '1-2 semanas',
    },
    {
      action: 'Iniciar proceso de certificación correspondiente',
      priority: 2,
      timeframe: '2-4 meses',
    },
  ],

  // Finanzas
  'no_working_capital': [
    {
      action: 'Evaluar opciones de financiamiento pre-exportación',
      priority: 1,
      timeframe: '2-4 semanas',
    },
    {
      action: 'Consultar productos financieros de COFIDE',
      priority: 2,
      timeframe: '1-2 semanas',
    },
  ],
  'no_cost_control': [
    {
      action: 'Implementar sistema básico de costeo',
      priority: 1,
      timeframe: '2-4 semanas',
    },
    {
      action: 'Calcular precio FOB de exportación',
      priority: 2,
      timeframe: '1-2 semanas',
    },
  ],
  'no_payment_knowledge': [
    {
      action: 'Capacitarse en medios de pago internacionales',
      priority: 1,
      timeframe: '1-2 semanas',
    },
    {
      action: 'Consultar con banco sobre cartas de crédito',
      priority: 2,
      timeframe: '1 semana',
    },
  ],

  // Mercado
  'no_target_market': [
    {
      action: 'Analizar mercados potenciales en SIICEX',
      priority: 1,
      timeframe: '2-3 semanas',
    },
    {
      action: 'Priorizar 2-3 mercados objetivo',
      priority: 2,
      timeframe: '1-2 semanas',
    },
  ],
  'no_competition_knowledge': [
    {
      action: 'Investigar competidores en Trade Map',
      priority: 1,
      timeframe: '2-3 semanas',
    },
    {
      action: 'Analizar precios de referencia internacionales',
      priority: 2,
      timeframe: '1-2 semanas',
    },
  ],
  'no_contacts': [
    {
      action: 'Registrarse en plataformas B2B (Alibaba, Peru Trade Now)',
      priority: 1,
      timeframe: '1-2 semanas',
    },
    {
      action: 'Participar en ruedas de negocio de PROMPERÚ',
      priority: 2,
      timeframe: '1-3 meses',
    },
  ],

  // RRHH
  'no_commitment': [
    {
      action: 'Definir exportación como objetivo estratégico',
      priority: 1,
      timeframe: '1-2 semanas',
    },
    {
      action: 'Asignar presupuesto inicial para desarrollo exportador',
      priority: 2,
      timeframe: '1 mes',
    },
  ],
  'no_languages': [
    {
      action: 'Identificar opciones de apoyo para comunicación en inglés',
      priority: 1,
      timeframe: '1-2 semanas',
    },
    {
      action: 'Considerar capacitación en inglés comercial básico',
      priority: 2,
      timeframe: '3-6 meses',
    },
  ],
  'no_dedicated_staff': [
    {
      action: 'Designar responsable de comercio exterior (tiempo parcial)',
      priority: 1,
      timeframe: '1-2 semanas',
    },
    {
      action: 'Capacitar al responsable en cursos de PROMPERÚ',
      priority: 2,
      timeframe: '1-2 meses',
    },
  ],
};

export const getResourcesForCategory = (categoryId: CategoryId): Resource[] => {
  return RESOURCES_BY_CATEGORY[categoryId] || [];
};

export const getRecommendationsForGap = (gapType: string): Recommendation[] => {
  return GAP_RECOMMENDATIONS[gapType] || [];
};
