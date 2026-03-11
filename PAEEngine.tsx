import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Brain, Network } from "lucide-react";

export default function PAEEngine() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Motor PAE M11</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Precession Analytics Engine - El corazón inteligente de DATAPOLIS v3.0
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-12 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl">¿Qué es el PAE M11?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              El PAE M11 es un motor de análisis predictivo revolucionario que aplica la teoría de Buckminster Fuller para predecir efectos territoriales indirectos. Transforma DATAPOLIS de una plataforma de gestión a una plataforma de inteligencia predictiva.
            </p>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-bold text-gray-900 mb-2">Innovación Patentable</h4>
              <p className="text-sm text-gray-600">
                El PAE M11 es una innovación única en el mercado con alto potencial de patentabilidad, diferenciando a DATAPOLIS de cualquier competidor.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dual-Core Architecture */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Arquitectura Dual-Core</CardTitle>
            <CardDescription>Dos cores especializados que trabajan en sincronía</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* M11-DP */}
              <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">M11-DP</h3>
                    <p className="text-sm text-gray-600">DATAPOLIS Precession</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Tecnología</h4>
                    <p className="text-sm text-gray-600">PHP 8.3 / Laravel 11 (In-Process)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Nivel de Análisis</h4>
                    <p className="text-sm text-gray-600">Micro (Activo Individual)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Responsabilidades</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Cálculo de VAN Precesional</li>
                      <li>✓ Impacto en activos individuales</li>
                      <li>✓ Análisis de riesgo precesional</li>
                      <li>✓ Integración directa con lógica de negocio</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* M11-AG */}
              <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">M11-AG</h3>
                    <p className="text-sm text-gray-600">ÁGORA Precession</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Tecnología</h4>
                    <p className="text-sm text-gray-600">Python 3.11 / FastAPI</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Nivel de Análisis</h4>
                    <p className="text-sm text-gray-600">Macro (Territorial)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Responsabilidades</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Análisis de grafos territoriales</li>
                      <li>✓ Conectividad urbana</li>
                      <li>✓ Mapas de calor de plusvalía</li>
                      <li>✓ Predicción de transformaciones</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Flow */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Flujo de Procesamiento</CardTitle>
            <CardDescription>Cómo el PAE analiza eventos en tiempo real</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-gray-900">Evento Iniciador</h4>
                  <p className="text-gray-600 text-sm">
                    Una acción en la plataforma genera un evento (ej. nuevo permiso de edificación, cambio en plan regulador)
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-gray-400" />
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-gray-900">Publicación en Bus de Eventos</h4>
                  <p className="text-gray-600 text-sm">
                    El evento se publica en Redis, donde ambos cores pueden suscribirse
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-gray-400" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 flex-shrink-0">3a</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Análisis Micro (M11-DP)</h4>
                    <p className="text-gray-600 text-sm">
                      Calcula impacto precesional en activos individuales
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700 flex-shrink-0">3b</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Análisis Macro (M11-AG)</h4>
                    <p className="text-gray-600 text-sm">
                      Analiza impacto territorial y conectividad urbana
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-gray-400" />
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-gray-900">Sincronización</h4>
                  <p className="text-gray-600 text-sm">
                    Los resultados se publican de nuevo en el bus y se almacenan en PostgreSQL
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-gray-400" />
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-700 flex-shrink-0">5</div>
                <div>
                  <h4 className="font-bold text-gray-900">Generación de Narrativa</h4>
                  <p className="text-gray-600 text-sm">
                    El Agente de IA (M23) genera un informe narrativo explicando el impacto del evento
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle className="text-lg">Análisis en Tiempo Real</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-sm">
              Procesa eventos y genera insights al instante, permitiendo decisiones basadas en datos actualizados
            </CardContent>
          </Card>

          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle className="text-lg">Sincronización Perfecta</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-sm">
              Los cores micro y macro se sincronizan automáticamente, garantizando coherencia en el análisis
            </CardContent>
          </Card>

          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle className="text-lg">Escalabilidad</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-sm">
              Arquitectura desacoplada permite escalar cada core independientemente según la demanda
            </CardContent>
          </Card>
        </div>

        {/* Use Cases */}
        <Card className="bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Casos de Uso</CardTitle>
            <CardDescription>Cómo el PAE M11 agrega valor a DATAPOLIS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <h4 className="font-bold text-gray-900">Análisis de Plusvalías</h4>
              <p className="text-gray-600 text-sm">
                Predice cambios en el valor de propiedades basado en cambios normativos y transformaciones territoriales
              </p>
            </div>
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <h4 className="font-bold text-gray-900">Evaluación de Riesgo</h4>
              <p className="text-gray-600 text-sm">
                Identifica riesgos precesionales que podrían afectar activos en el futuro
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4 py-2">
              <h4 className="font-bold text-gray-900">Planificación Urbana</h4>
              <p className="text-gray-600 text-sm">
                Ayuda a municipios a entender el impacto de decisiones de planificación en el territorio
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4 py-2">
              <h4 className="font-bold text-gray-900">Inversión Inteligente</h4>
              <p className="text-gray-600 text-sm">
                Identifica oportunidades de inversión basadas en análisis precesional de transformaciones territoriales
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
