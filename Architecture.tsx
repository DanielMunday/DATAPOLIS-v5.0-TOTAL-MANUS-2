import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Cpu, Network, Zap } from "lucide-react";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

export default function Architecture() {
  const components = [
    {
      name: "Frontend (SPA)",
      tech: "Vue 3 + Vite",
      icon: <Cpu className="w-6 h-6" />,
      description: "Interfaz de usuario moderna y responsiva",
      color: "bg-green-100 text-green-700"
    },
    {
      name: "Backend Principal",
      tech: "PHP 8.3 / Laravel 11",
      icon: <Server className="w-6 h-6" />,
      description: "Lógica de negocio y API RESTful",
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Base de Datos",
      tech: "PostgreSQL 16 + PostGIS",
      icon: <Database className="w-6 h-6" />,
      description: "Almacenamiento transaccional y geoespacial",
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "Motor de IA",
      tech: "Python 3.11 / FastAPI",
      icon: <Zap className="w-6 h-6" />,
      description: "Análisis territorial y Machine Learning",
      color: "bg-orange-100 text-orange-700"
    },
    {
      name: "Bus de Eventos",
      tech: "Redis",
      icon: <Network className="w-6 h-6" />,
      description: "Comunicación asíncrona entre cores",
      color: "bg-red-100 text-red-700"
    },
    {
      name: "DB Vectorial",
      tech: "ChromaDB",
      icon: <Database className="w-6 h-6" />,
      description: "Almacenamiento de embeddings para RAG",
      color: "bg-indigo-100 text-indigo-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Arquitectura Técnica</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            DATAPOLIS v3.0 utiliza una arquitectura dual-stack robusta y desacoplada, diseñada para maximizar la especialización y la escalabilidad
          </p>
        </div>

        {/* Interactive Diagram */}
        <div className="mb-12">
          <ArchitectureDiagram />
        </div>

        {/* Architecture Overview */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Stack Tecnológico</CardTitle>
            <CardDescription>Componentes principales y sus responsabilidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {components.map((comp, idx) => (
                <div key={idx} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${comp.color}`}>
                    {comp.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{comp.name}</h3>
                  <Badge className="mb-3">{comp.tech}</Badge>
                  <p className="text-gray-600 text-sm">{comp.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dual-Core PAE Architecture */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Arquitectura Dual-Core del PAE M11</CardTitle>
            <CardDescription>Rectificación arquitectónica clave de v3.0</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-600 pl-6 py-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">M11-DP (DATAPOLIS Precession)</h3>
                <p className="text-gray-600 mb-3">Service Provider nativo en Laravel que se ejecuta in-process</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Análisis precesional a nivel de activo (micro)</li>
                  <li>✓ Integración directa con lógica de negocio</li>
                  <li>✓ Elimina latencia de red</li>
                  <li>✓ Cálculo de impacto VAN Precesional</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-600 pl-6 py-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">M11-AG (ÁGORA Precession)</h3>
                <p className="text-gray-600 mb-3">Servicio nativo en Python especializado en análisis territorial</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Análisis de grafos a nivel meso/macro</li>
                  <li>✓ Conectividad urbana y mapas de calor</li>
                  <li>✓ Predicción de transformaciones territoriales</li>
                  <li>✓ Integración con FastAPI</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3">Sincronización mediante Redis</h4>
              <p className="text-gray-600">
                Los cores se sincronizan a través de un patrón de publicación/suscripción en Redis, asegurando que los cambios en un nivel se propaguen eficientemente al otro. Esta arquitectura transforma a DATAPOLIS de una plataforma de gestión a una plataforma de inteligencia predictiva.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Flow */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Flujo de Datos</CardTitle>
            <CardDescription>Cómo interactúan los componentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center font-bold text-green-700">1</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Usuario → Frontend</h4>
                  <p className="text-sm text-gray-600">Interacción a través de Vue 3 SPA</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-700">2</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Frontend → Backend</h4>
                  <p className="text-sm text-gray-600">API RESTful sobre HTTPS</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center font-bold text-purple-700">3</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Backend → Múltiples Destinos</h4>
                  <p className="text-sm text-gray-600">PostgreSQL, Motor IA, Bus de Eventos, PAE Cores</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center font-bold text-orange-700">4</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Análisis Paralelo</h4>
                  <p className="text-sm text-gray-600">M11-DP y M11-AG procesan eventos de forma sincronizada</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center font-bold text-red-700">5</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Resultados → Usuario</h4>
                  <p className="text-sm text-gray-600">Narrativas e insights generados por IA</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle>Escalabilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600">
                La arquitectura desacoplada permite escalar cada componente independientemente según la demanda.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Horizontal scaling con Kubernetes</li>
                <li>✓ Load balancing automático</li>
                <li>✓ Caching distribuido con Redis</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle>Confiabilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600">
                Múltiples capas de redundancia y recuperación de fallos.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Replicación de base de datos</li>
                <li>✓ Retry automático en colas</li>
                <li>✓ Circuit breakers en servicios</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
