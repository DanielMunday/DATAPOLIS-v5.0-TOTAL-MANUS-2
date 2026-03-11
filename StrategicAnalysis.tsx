import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Target, Zap } from "lucide-react";
import SWOTVisualization from "@/components/SWOTVisualization";

export default function StrategicAnalysis() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Análisis Estratégico</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Análisis FODA y oportunidades de mercado para DATAPOLIS v3.0
          </p>
        </div>

        {/* Interactive SWOT Visualization */}
        <div className="mb-12">
          <SWOTVisualization />
        </div>

        {/* SWOT Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12" style={{ display: 'none' }}>
          {/* Fortalezas */}
          <Card className="bg-green-50 border-2 border-green-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
                  <TrendingUp size={20} />
                </div>
                <CardTitle className="text-green-900">Fortalezas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-gray-900">Ecosistema Integral</h4>
                <p className="text-sm text-gray-600">La cobertura de 23 módulos en 5 verticales es una barrera de entrada formidable</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-gray-900">Innovación Patentable (PAE)</h4>
                <p className="text-sm text-gray-600">El motor de análisis precesional es un diferenciador tecnológico único en el mercado</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-gray-900">Arquitectura Robusta</h4>
                <p className="text-sm text-gray-600">Laravel + Vue es maduro y escalable. Arquitectura dual-core del PAE es altamente eficiente</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-bold text-gray-900">Costo de IA Cero</h4>
                <p className="text-sm text-gray-600">Uso de Ollama como LLM local elimina costos variables de API</p>
              </div>
            </CardContent>
          </Card>

          {/* Debilidades */}
          <Card className="bg-red-50 border-2 border-red-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white">
                  <AlertTriangle size={20} />
                </div>
                <CardTitle className="text-red-900">Debilidades</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-gray-900">Complejidad</h4>
                <p className="text-sm text-gray-600">La gran cantidad de módulos puede ser abrumadora para nuevos clientes</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-gray-900">Dependencia del Mercado Chileno</h4>
                <p className="text-sm text-gray-600">Altamente especializada en normativa chilena, requiere esfuerzo para adaptación</p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="font-bold text-gray-900">Curva de Aprendizaje</h4>
                <p className="text-sm text-gray-600">Requiere un onboarding robusto y soporte técnico especializado</p>
              </div>
            </CardContent>
          </Card>

          {/* Oportunidades */}
          <Card className="bg-blue-50 border-2 border-blue-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Target size={20} />
                </div>
                <CardTitle className="text-blue-900">Oportunidades</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-bold text-gray-900">Expansión a Nuevos Mercados</h4>
                <p className="text-sm text-gray-600">Modularidad permite adaptar a otros países de LATAM con marcos regulatorios similares</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-bold text-gray-900">Productos de Datos</h4>
                <p className="text-sm text-gray-600">Datos anonimizados para generar benchmarks y reportes de mercado</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-bold text-gray-900">GovTech</h4>
                <p className="text-sm text-gray-600">PAE y módulos ÁGORA tienen potencial inmenso para planificación urbana e inversión pública</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-bold text-gray-900">Integración con Fintech Global</h4>
                <p className="text-sm text-gray-600">Oportunidad de asociaciones con plataformas fintech internacionales</p>
              </div>
            </CardContent>
          </Card>

          {/* Amenazas */}
          <Card className="bg-orange-50 border-2 border-orange-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
                  <Zap size={20} />
                </div>
                <CardTitle className="text-orange-900">Amenazas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-gray-900">Cambios Regulatorios Drásticos</h4>
                <p className="text-sm text-gray-600">Cambio fundamental en ley de copropiedad o normativa financiera requeriría grandes adaptaciones</p>
              </div>
              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-gray-900">Competidores de Nicho</h4>
                <p className="text-sm text-gray-600">Startups enfocadas en un solo módulo podrían competir en precio en segmentos específicos</p>
              </div>
              <div className="border-l-4 border-orange-600 pl-4">
                <h4 className="font-bold text-gray-900">Consolidación del Mercado</h4>
                <p className="text-sm text-gray-600">Grandes jugadores globales podrían entrar al mercado chileno con recursos superiores</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Opportunities */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Oportunidades de Mercado</CardTitle>
            <CardDescription>Segmentos y verticales con mayor potencial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Administración de Condominios</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Mercado primario con miles de condominios en Chile
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>TAM:</strong> USD 500M+ anual
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Análisis de Inversión Inmobiliaria</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Fondos de inversión y desarrolladores inmobiliarios
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>TAM:</strong> USD 800M+ anual
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Planificación Urbana Municipal</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Municipios y gobiernos regionales
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>TAM:</strong> USD 1B+ anual
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-2">Instituciones Financieras</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Bancos e instituciones de crédito
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>TAM:</strong> USD 600M+ anual
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">Mercado Total Accesible (TAM)</h4>
                <p className="text-gray-600 text-sm mb-3">
                  El mercado potencial en LATAM para soluciones de gestión inmobiliaria, análisis de inversión y planificación urbana se estima en más de USD 3.4 mil millones anuales.
                </p>
                <p className="text-xs text-gray-500">
                  Basado en análisis de mercado de Bloomberg Associates y datos de SimilarWeb
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Recommendations */}
        <Card className="bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Recomendaciones Estratégicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <h4 className="font-bold text-gray-900">1. Enfoque en Segmento Primario</h4>
              <p className="text-gray-600 text-sm">
                Consolidar posición en administración de condominios antes de expandir a otros segmentos
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <h4 className="font-bold text-gray-900">2. Inversión en Onboarding</h4>
              <p className="text-gray-600 text-sm">
                Desarrollar programas de capacitación y soporte para reducir la curva de aprendizaje
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <h4 className="font-bold text-gray-900">3. Expansión Regional</h4>
              <p className="text-gray-600 text-sm">
                Comenzar con Perú y Colombia, adaptando la plataforma a marcos regulatorios locales
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <h4 className="font-bold text-gray-900">4. Protección de Propiedad Intelectual</h4>
              <p className="text-gray-600 text-sm">
                Priorizar patentes del PAE M11 y otras innovaciones clave
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <h4 className="font-bold text-gray-900">5. Partnerships Estratégicos</h4>
              <p className="text-gray-600 text-sm">
                Buscar alianzas con instituciones financieras y gobiernos locales
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
