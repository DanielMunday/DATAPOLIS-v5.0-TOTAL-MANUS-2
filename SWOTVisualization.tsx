import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';

interface SWOTItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SWOTCategory {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  items: SWOTItem[];
}

export default function SWOTVisualization() {
  const [selectedCategory, setSelectedCategory] = useState<string>('strengths');

  const swotData: Record<string, SWOTCategory> = {
    strengths: {
      name: 'Fortalezas',
      color: 'text-green-900',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      items: [
        {
          title: 'Ecosistema Integral',
          description: '23 módulos en 5 verticales crean una barrera de entrada formidable',
          icon: <TrendingUp className="w-5 h-5" />
        },
        {
          title: 'Innovación Patentable',
          description: 'Motor PAE M11 es un diferenciador tecnológico único en el mercado',
          icon: <TrendingUp className="w-5 h-5" />
        },
        {
          title: 'Arquitectura Robusta',
          description: 'Laravel + Vue maduro y escalable con dual-core PAE altamente eficiente',
          icon: <TrendingUp className="w-5 h-5" />
        },
        {
          title: 'Costo de IA Cero',
          description: 'Ollama como LLM local elimina costos variables de API',
          icon: <TrendingUp className="w-5 h-5" />
        }
      ]
    },
    weaknesses: {
      name: 'Debilidades',
      color: 'text-red-900',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      items: [
        {
          title: 'Complejidad',
          description: 'Gran cantidad de módulos puede ser abrumadora para nuevos clientes',
          icon: <AlertTriangle className="w-5 h-5" />
        },
        {
          title: 'Dependencia del Mercado Chileno',
          description: 'Altamente especializada en normativa chilena, requiere adaptación',
          icon: <AlertTriangle className="w-5 h-5" />
        },
        {
          title: 'Curva de Aprendizaje',
          description: 'Requiere onboarding robusto y soporte técnico especializado',
          icon: <AlertTriangle className="w-5 h-5" />
        }
      ]
    },
    opportunities: {
      name: 'Oportunidades',
      color: 'text-blue-900',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      items: [
        {
          title: 'Expansión a LATAM',
          description: 'Modularidad permite adaptar a otros países con marcos regulatorios similares',
          icon: <Target className="w-5 h-5" />
        },
        {
          title: 'Productos de Datos',
          description: 'Datos anonimizados para generar benchmarks y reportes de mercado',
          icon: <Target className="w-5 h-5" />
        },
        {
          title: 'GovTech',
          description: 'PAE y ÁGORA tienen potencial inmenso para planificación urbana',
          icon: <Target className="w-5 h-5" />
        },
        {
          title: 'Integración Fintech Global',
          description: 'Asociaciones con plataformas fintech internacionales',
          icon: <Target className="w-5 h-5" />
        }
      ]
    },
    threats: {
      name: 'Amenazas',
      color: 'text-orange-900',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      items: [
        {
          title: 'Cambios Regulatorios',
          description: 'Cambios fundamentales en ley de copropiedad requieren grandes adaptaciones',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Competidores de Nicho',
          description: 'Startups enfocadas en un módulo podrían competir en precio',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Consolidación del Mercado',
          description: 'Grandes jugadores globales podrían entrar al mercado chileno',
          icon: <Zap className="w-5 h-5" />
        }
      ]
    }
  };

  const categories = Object.entries(swotData);
  const current = swotData[selectedCategory];

  return (
    <Card className="bg-white border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Análisis FODA Interactivo</CardTitle>
        <CardDescription>Haz clic en cada categoría para explorar</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Category Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {categories.map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === key
                  ? `${data.bgColor} ${data.borderColor} ring-2 ring-offset-2 ring-blue-500`
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`font-bold ${selectedCategory === key ? data.color : 'text-gray-700'}`}>
                {data.name}
              </div>
            </button>
          ))}
        </div>

        {/* Details Grid */}
        <div className={`p-6 rounded-lg border-2 ${current.bgColor} ${current.borderColor}`}>
          <h3 className={`text-2xl font-bold mb-6 ${current.color}`}>{current.name}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {current.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <div className={`flex items-start gap-3 ${current.color}`}>
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(([key, data]) => (
            <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{data.items.length}</div>
              <div className="text-xs text-gray-600 mt-1">{data.name}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
