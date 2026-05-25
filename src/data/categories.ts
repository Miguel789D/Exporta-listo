import type { Category, CategoryId } from '@/types/diagnostic';

export const CATEGORIES: Category[] = [
  {
    id: 'product',
    name: 'Producto y Propuesta de Valor',
    description: 'Evalúa la competitividad, diferenciación y adaptabilidad de tu producto para mercados internacionales.',
    weight: 0.20,
    icon: 'Package',
  },
  {
    id: 'operations',
    name: 'Capacidad Operativa',
    description: 'Mide tu capacidad de producción, control de calidad y logística para atender demanda de exportación.',
    weight: 0.18,
    icon: 'Settings',
  },
  {
    id: 'documentation',
    name: 'Documentación y Cumplimiento',
    description: 'Verifica tu preparación en términos de registros, certificaciones y documentos necesarios para exportar.',
    weight: 0.20,
    icon: 'FileText',
  },
  {
    id: 'finance',
    name: 'Capacidad Financiera',
    description: 'Evalúa tu liquidez, acceso a financiamiento y conocimiento de costos para operaciones de exportación.',
    weight: 0.15,
    icon: 'DollarSign',
  },
  {
    id: 'market',
    name: 'Conocimiento de Mercado',
    description: 'Mide tu investigación de mercados objetivo, competencia y canales de distribución internacional.',
    weight: 0.15,
    icon: 'Globe',
  },
  {
    id: 'human_resources',
    name: 'Recursos Humanos y Compromiso',
    description: 'Evalúa el compromiso gerencial, capacidades del equipo e idiomas para comercio exterior.',
    weight: 0.12,
    icon: 'Users',
  },
];

export const getCategoryById = (id: CategoryId): Category | undefined => {
  return CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryName = (id: CategoryId): string => {
  return getCategoryById(id)?.name ?? id;
};

export const TOTAL_STEPS = CATEGORIES.length + 1; // +1 para info de empresa
