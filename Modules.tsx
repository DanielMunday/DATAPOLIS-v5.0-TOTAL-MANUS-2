import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Modules() {
  interface Module {
  id: string;
  name: string;
  desc: string;
  highlight?: boolean;
}

interface Vertical {
  name: string;
  color: string;
  description: string;
  modules: Module[];
}

const verticals: Record<string, Vertical> = {
    proptech: {
      name: "PropTech",
      color: "bg-green-100 text-green-700",
      description: "Gestión de Activos y Comunidades",
      modules: [
        { id: "M01", name: "Administración", desc: "Gestión de comunidades, residentes y espacios comunes" },
        { id: "M03", name: "Remuneraciones", desc: "Cálculo y pago de sueldos del personal del condominio" },
        { id: "M06", name: "Mantenimiento", desc: "Planificación y seguimiento de mantenimientos preventivos" },
        { id: "M07", name: "Reservas de Espacios", desc: "Sistema de reserva de quinchos, salones y otros espacios" },
        { id: "M08", name: "Comunicación y Alertas", desc: "Canal de comunicación oficial con residentes" }
      ]
    },
    fintech: {
      name: "FinTech",
      color: "bg-red-100 text-red-700",
      description: "Análisis Financiero y de Riesgo",
      modules: [
        { id: "M02", name: "Finanzas y Contabilidad", desc: "Contabilidad, presupuestos, fondos y conciliación bancaria" },
        { id: "M04", name: "Cobranzas", desc: "Emisión y seguimiento de gastos comunes, multas e intereses" },
        { id: "M09", name: "Expediente Universal", desc: "Repositorio único de toda la data financiera y legal del activo" },
        { id: "M10", name: "Open Finance", desc: "Integración con sistema bancario para análisis de flujos" },
        { id: "M12", name: "Credit Scoring Inmobiliario", desc: "Modelo de riesgo crediticio para activos inmobiliarios" }
      ]
    },
    regtech: {
      name: "RegTech",
      color: "bg-orange-100 text-orange-700",
      description: "Cumplimiento Normativo",
      modules: [
        { id: "M13", name: "Due Diligence Automatizado", desc: "Chequeo automatizado de contingencias legales y técnicas" },
        { id: "M14", name: "Herencias y Sucesiones", desc: "Modelo de valorización y partición de herencias" },
        { id: "M15", name: "Expropiaciones", desc: "Análisis y valorización de expropiaciones" }
      ]
    },
    geotech: {
      name: "GeoTech",
      color: "bg-blue-100 text-blue-700",
      description: "Inteligencia Territorial",
      modules: [
        { id: "M11", name: "PAE M11", desc: "Motor de Analítica Precesional (Core de la plataforma)", highlight: true },
        { id: "M16", name: "Análisis de Plusvalías", desc: "Cálculo y predicción de plusvalías por cambios normativos" },
        { id: "M17", name: "Diagnóstico Territorial", desc: "Análisis de normativas urbanas, usos de suelo y potencial" }
      ]
    },
    govtech: {
      name: "GovTech",
      color: "bg-purple-100 text-purple-700",
      description: "Gobernanza y Participación",
      modules: [
        { id: "M05", name: "Asambleas y Votaciones", desc: "Gestión de asambleas remotas y votaciones en línea" },
        { id: "M18", name: "Observatorio Urbano", desc: "Plataforma de visualización de datos territoriales" }
      ]
    },
    ia: {
      name: "Sistema Multi-Agente",
      color: "bg-indigo-100 text-indigo-700",
      description: "Inteligencia Artificial Aumentada",
      modules: [
        { id: "M19", name: "Agente Orquestador", desc: "Coordina a los demás agentes para resolver consultas complejas" },
        { id: "M20", name: "Agente de Dominio Legal", desc: "Especializado en la interpretación de normativas y leyes" },
        { id: "M21", name: "Agente de Dominio Financiero", desc: "Especializado en análisis financiero y de inversiones" },
        { id: "M22", name: "Agente de Dominio Territorial", desc: "Especializado en análisis geoespacial y urbanístico" },
        { id: "M23", name: "RAG & Narrative Engine", desc: "Genera informes y narrativas a partir de los datos analizados" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ecosistema de Módulos</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            DATAPOLIS v3.0 integra 23 módulos funcionales organizados en 6 verticales, proporcionando una solución integral para la gestión inmobiliaria
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">Módulos Totales</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600">6</div>
              <div className="text-sm text-gray-600">Verticales</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-purple-600">150+</div>
              <div className="text-sm text-gray-600">Endpoints API</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Compliance</div>
            </CardContent>
          </Card>
        </div>

        {/* Modules by Vertical */}
        <Tabs defaultValue="proptech" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
            {Object.entries(verticals).map(([key, vertical]) => (
              <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
                {vertical.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(verticals).map(([key, vertical]) => (
            <TabsContent key={key} value={key}>
              <Card className="bg-white border-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${vertical.color}`}></div>
                    <div>
                      <CardTitle>{vertical.name}</CardTitle>
                      <CardDescription>{vertical.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vertical.modules.map((module) => (
                      <div
                        key={module.id}
                        className={`border rounded-lg p-4 ${module.highlight ? 'border-purple-300 bg-purple-50' : 'border-gray-200'}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{module.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{module.desc}</p>
                          </div>
                          <Badge variant="outline">{module.id}</Badge>
                        </div>
                        {module.highlight && (
                          <div className="mt-3 text-xs text-purple-700 font-semibold">
                            ⭐ Core de la Plataforma
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Module Integration */}
        <Card className="mt-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Integración de Módulos</CardTitle>
            <CardDescription>Cómo se comunican los módulos entre sí</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Event Bus (Redis)</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Los módulos se comunican a través de un bus de eventos asíncrono, permitiendo que cambios en un módulo se propaguen automáticamente a otros.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Publicación/Suscripción de eventos</li>
                  <li>✓ Comunicación desacoplada</li>
                  <li>✓ Procesamiento en tiempo real</li>
                </ul>
              </div>
              <div className="border rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">API RESTful</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Cada módulo expone endpoints específicos que pueden ser consumidos por otros módulos o por aplicaciones externas.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ 150+ endpoints documentados</li>
                  <li>✓ Versionamiento de API</li>
                  <li>✓ Autenticación y autorización</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3">Ontología Compartida</h4>
              <p className="text-gray-600">
                Todos los módulos comparten una ontología común de conceptos (Activo, Usuario, Evento, etc.) que garantiza la coherencia de datos y facilita la integración.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
