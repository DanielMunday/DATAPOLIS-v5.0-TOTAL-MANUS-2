import { createContext, useContext, useState, ReactNode } from 'react';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  page: string;
  href: string;
}

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Comprehensive search database
  const searchDatabase: SearchResult[] = [
    // Modules
    { id: 'm01', title: 'M01 - Administración', description: 'Gestión de comunidades, residentes y espacios comunes', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm02', title: 'M02 - Finanzas y Contabilidad', description: 'Contabilidad, presupuestos, fondos y conciliación bancaria', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm03', title: 'M03 - Remuneraciones', description: 'Cálculo y pago de sueldos del personal del condominio', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm04', title: 'M04 - Cobranzas', description: 'Emisión y seguimiento de gastos comunes, multas e intereses', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm05', title: 'M05 - Asambleas y Votaciones', description: 'Gestión de asambleas remotas y votaciones en línea', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm06', title: 'M06 - Mantenimiento', description: 'Planificación y seguimiento de mantenimientos preventivos', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm07', title: 'M07 - Reservas de Espacios', description: 'Sistema de reserva de quinchos, salones y otros espacios', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm08', title: 'M08 - Comunicación y Alertas', description: 'Canal de comunicación oficial con residentes', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm09', title: 'M09 - Expediente Universal', description: 'Repositorio único de toda la data financiera y legal del activo', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm10', title: 'M10 - Open Finance', description: 'Integración con sistema bancario para análisis de flujos', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm11', title: 'M11 - PAE M11', description: 'Motor de Analítica Precesional (Core de la plataforma)', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm12', title: 'M12 - Credit Scoring Inmobiliario', description: 'Modelo de riesgo crediticio para activos inmobiliarios', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm13', title: 'M13 - Due Diligence Automatizado', description: 'Chequeo automatizado de contingencias legales y técnicas', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm14', title: 'M14 - Herencias y Sucesiones', description: 'Modelo de valorización y partición de herencias', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm15', title: 'M15 - Expropiaciones', description: 'Análisis y valorización de expropiaciones', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm16', title: 'M16 - Análisis de Plusvalías', description: 'Cálculo y predicción de plusvalías por cambios normativos', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm17', title: 'M17 - Diagnóstico Territorial', description: 'Análisis de normativas urbanas, usos de suelo y potencial', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm18', title: 'M18 - Observatorio Urbano', description: 'Plataforma de visualización de datos territoriales', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm19', title: 'M19 - Agente Orquestador', description: 'Coordina a los demás agentes para resolver consultas complejas', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm20', title: 'M20 - Agente de Dominio Legal', description: 'Especializado en la interpretación de normativas y leyes', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm21', title: 'M21 - Agente de Dominio Financiero', description: 'Especializado en análisis financiero y de inversiones', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm22', title: 'M22 - Agente de Dominio Territorial', description: 'Especializado en análisis geoespacial y urbanístico', category: 'Módulo', page: 'Modules', href: '/modules' },
    { id: 'm23', title: 'M23 - RAG & Narrative Engine', description: 'Genera informes y narrativas a partir de los datos analizados', category: 'Módulo', page: 'Modules', href: '/modules' },

    // Architecture Components
    { id: 'arch-frontend', title: 'Frontend (Vue 3 SPA)', description: 'Interfaz de usuario moderna y responsiva', category: 'Arquitectura', page: 'Architecture', href: '/architecture' },
    { id: 'arch-backend', title: 'Backend (Laravel 11)', description: 'Lógica de negocio y API RESTful', category: 'Arquitectura', page: 'Architecture', href: '/architecture' },
    { id: 'arch-db', title: 'PostgreSQL 16', description: 'Almacenamiento transaccional y geoespacial', category: 'Arquitectura', page: 'Architecture', href: '/architecture' },
    { id: 'arch-ai', title: 'Motor de IA (FastAPI)', description: 'Análisis territorial y Machine Learning', category: 'Arquitectura', page: 'Architecture', href: '/architecture' },
    { id: 'arch-redis', title: 'Redis', description: 'Bus de eventos y comunicación asíncrona', category: 'Arquitectura', page: 'Architecture', href: '/architecture' },
    { id: 'arch-chroma', title: 'ChromaDB', description: 'Almacenamiento de embeddings para RAG', category: 'Arquitectura', page: 'Architecture', href: '/architecture' },

    // PAE Engine
    { id: 'pae-m11dp', title: 'M11-DP (DATAPOLIS Precession)', description: 'Análisis precesional a nivel de activo individual', category: 'PAE', page: 'PAE Engine', href: '/pae' },
    { id: 'pae-m11ag', title: 'M11-AG (ÁGORA Precession)', description: 'Análisis territorial y conectividad urbana', category: 'PAE', page: 'PAE Engine', href: '/pae' },
    { id: 'pae-sync', title: 'Sincronización PAE', description: 'Patrón de publicación/suscripción en Redis', category: 'PAE', page: 'PAE Engine', href: '/pae' },

    // Analysis
    { id: 'swot-strengths', title: 'Fortalezas', description: 'Ecosistema integral, innovación patentable, arquitectura robusta', category: 'Análisis', page: 'Strategic Analysis', href: '/analysis' },
    { id: 'swot-weaknesses', title: 'Debilidades', description: 'Complejidad, dependencia del mercado chileno', category: 'Análisis', page: 'Strategic Analysis', href: '/analysis' },
    { id: 'swot-opportunities', title: 'Oportunidades', description: 'Expansión a LATAM, productos de datos, GovTech', category: 'Análisis', page: 'Strategic Analysis', href: '/analysis' },
    { id: 'swot-threats', title: 'Amenazas', description: 'Cambios regulatorios, competidores de nicho', category: 'Análisis', page: 'Strategic Analysis', href: '/analysis' },

    // Installation
    { id: 'install-requirements', title: 'Requisitos del Servidor', description: 'Ubuntu 22.04, PHP 8.3, PostgreSQL 16', category: 'Instalación', page: 'Installation', href: '/installation' },
    { id: 'install-steps', title: 'Pasos de Instalación', description: 'Clonar, configurar, instalar dependencias', category: 'Instalación', page: 'Installation', href: '/installation' },
    { id: 'install-docker', title: 'Despliegue con Docker', description: 'Opción recomendada para producción', category: 'Instalación', page: 'Installation', href: '/installation' },
  ];

  const filteredResults = query.trim() === '' 
    ? [] 
    : searchDatabase.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);

  return (
    <SearchContext.Provider value={{ query, setQuery, results: filteredResults, isOpen, setIsOpen }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};
