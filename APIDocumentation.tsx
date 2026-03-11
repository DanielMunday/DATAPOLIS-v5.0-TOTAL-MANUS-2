import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";
import APITester from "@/components/APITester";

export default function APIDocumentation() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const endpoints = [
    {
      method: "GET",
      path: "/api/modules",
      description: "Obtener lista de todos los módulos",
      params: [
        { name: "page", type: "integer", description: "Número de página (default: 1)" },
        { name: "limit", type: "integer", description: "Elementos por página (default: 20)" }
      ],
      response: {
        status: 200,
        example: `{
  "data": [
    {
      "id": "M01",
      "name": "Administración",
      "vertical": "PropTech",
      "description": "Gestión de comunidades..."
    }
  ],
  "pagination": { "total": 23, "page": 1, "limit": 20 }
}`
      }
    },
    {
      method: "GET",
      path: "/api/modules/:id",
      description: "Obtener detalles de un módulo específico",
      params: [
        { name: "id", type: "string", description: "ID del módulo (ej: M01)" }
      ],
      response: {
        status: 200,
        example: `{
  "id": "M01",
  "name": "Administración",
  "vertical": "PropTech",
  "description": "Gestión de comunidades, residentes y espacios comunes",
  "endpoints": 12,
  "status": "active"
}`
      }
    },
    {
      method: "POST",
      path: "/api/analysis/pae",
      description: "Ejecutar análisis precesional en un activo",
      params: [
        { name: "asset_id", type: "string", description: "ID del activo a analizar" },
        { name: "event_type", type: "string", description: "Tipo de evento (zoning_change, permit, etc)" }
      ],
      response: {
        status: 200,
        example: `{
  "analysis_id": "ana_123456",
  "asset_id": "ast_789",
  "pae_score": 8.5,
  "impact_level": "high",
  "narrative": "El cambio de zonificación...",
  "timestamp": "2026-02-27T20:00:00Z"
}`
      }
    },
    {
      method: "GET",
      path: "/api/search",
      description: "Buscar en la plataforma",
      params: [
        { name: "q", type: "string", description: "Término de búsqueda" },
        { name: "type", type: "string", description: "Tipo de búsqueda (modules, assets, analysis)" }
      ],
      response: {
        status: 200,
        example: `{
  "results": [
    {
      "id": "M11",
      "title": "PAE M11",
      "type": "module",
      "score": 0.95
    }
  ],
  "count": 1
}`
      }
    },
    {
      method: "GET",
      path: "/api/health",
      description: "Verificar estado de la API",
      params: [],
      response: {
        status: 200,
        example: `{
  "status": "healthy",
  "version": "3.0.0",
  "timestamp": "2026-02-27T20:00:00Z",
  "services": {
    "database": "ok",
    "cache": "ok",
    "ai_engine": "ok"
  }
}`
      }
    }
  ];

  const methodColors: Record<string, string> = {
    GET: "bg-blue-100 text-blue-700",
    POST: "bg-green-100 text-green-700",
    PUT: "bg-yellow-100 text-yellow-700",
    DELETE: "bg-red-100 text-red-700"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentación de API</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Especificación completa de los 150+ endpoints disponibles en DATAPOLIS v3.0
          </p>
        </div>

        {/* API Overview */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Información General de la API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Base URL</h4>
                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                  https://api.datapolis.io/v1
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Autenticación</h4>
                <p className="text-gray-600 text-sm">
                  Bearer Token en header Authorization
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Formato de Respuesta</h4>
                <p className="text-gray-600 text-sm">
                  JSON con estructura estándar
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Rate Limit</h4>
                <p className="text-gray-600 text-sm">
                  1000 requests por hora
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive API Tester */}
        <div className="mb-12">
          <APITester />
        </div>

        {/* Endpoints */}
        <Card className="bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Endpoints Principales</CardTitle>
            <CardDescription>Ejemplos de los endpoints más utilizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {endpoints.map((endpoint, idx) => (
                <div key={idx} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  {/* Endpoint Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className={methodColors[endpoint.method]}>
                        {endpoint.method}
                      </Badge>
                      <code className="font-mono text-gray-900 font-semibold">
                        {endpoint.path}
                      </code>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{endpoint.description}</p>

                  {/* Parameters */}
                  {endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-bold text-gray-900 mb-2">Parámetros:</h5>
                      <div className="space-y-2">
                        {endpoint.params.map((param, pidx) => (
                          <div key={pidx} className="text-sm text-gray-600 pl-4 border-l-2 border-gray-300">
                            <span className="font-mono text-gray-900">{param.name}</span>
                            <span className="text-gray-500"> ({param.type})</span>
                            <p className="text-xs text-gray-500 mt-1">{param.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Response Example */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-gray-900">Respuesta (Status {endpoint.response.status}):</h5>
                      <button
                        onClick={() => copyToClipboard(endpoint.response.example, `endpoint-${idx}`)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {copiedId === `endpoint-${idx}` ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <Copy size={16} className="text-gray-600" />
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
                      {endpoint.response.example}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Error Handling */}
        <Card className="mt-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Manejo de Errores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <Badge className="bg-red-100 text-red-700 mb-3">400</Badge>
                <h4 className="font-bold text-gray-900 mb-2">Bad Request</h4>
                <p className="text-sm text-gray-600">
                  Parámetros inválidos o faltantes en la solicitud
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <Badge className="bg-red-100 text-red-700 mb-3">401</Badge>
                <h4 className="font-bold text-gray-900 mb-2">Unauthorized</h4>
                <p className="text-sm text-gray-600">
                  Token de autenticación inválido o expirado
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <Badge className="bg-red-100 text-red-700 mb-3">403</Badge>
                <h4 className="font-bold text-gray-900 mb-2">Forbidden</h4>
                <p className="text-sm text-gray-600">
                  Usuario no tiene permisos para acceder al recurso
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <Badge className="bg-red-100 text-red-700 mb-3">429</Badge>
                <h4 className="font-bold text-gray-900 mb-2">Too Many Requests</h4>
                <p className="text-sm text-gray-600">
                  Se ha excedido el límite de solicitudes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SDKs */}
        <Card className="mt-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">SDKs Disponibles</CardTitle>
            <CardDescription>Librerías oficiales para facilitar la integración</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">Python</h4>
                <code className="text-sm text-gray-600 block mb-3">pip install datapolis-sdk</code>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Ver documentación →
                </a>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">JavaScript/TypeScript</h4>
                <code className="text-sm text-gray-600 block mb-3">npm install @datapolis/sdk</code>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Ver documentación →
                </a>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <h4 className="font-bold text-gray-900 mb-2">PHP</h4>
                <code className="text-sm text-gray-600 block mb-3">composer require datapolis/sdk</code>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Ver documentación →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
