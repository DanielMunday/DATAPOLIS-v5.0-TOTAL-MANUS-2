import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Copy, Check, AlertCircle } from 'lucide-react';

interface APIRequest {
  id: string;
  method: string;
  endpoint: string;
  description: string;
  params?: Record<string, string>;
  body?: string;
}

export default function APITester() {
  const [selectedRequest, setSelectedRequest] = useState<string>('modules');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const requests: Record<string, APIRequest> = {
    modules: {
      id: 'modules',
      method: 'GET',
      endpoint: '/api/modules',
      description: 'Obtener lista de todos los módulos',
      params: { page: '1', limit: '5' }
    },
    moduleDetail: {
      id: 'moduleDetail',
      method: 'GET',
      endpoint: '/api/modules/M01',
      description: 'Obtener detalles de un módulo específico'
    },
    paeAnalysis: {
      id: 'paeAnalysis',
      method: 'POST',
      endpoint: '/api/analysis/pae',
      description: 'Ejecutar análisis precesional',
      body: JSON.stringify({
        asset_id: 'ast_123456',
        event_type: 'zoning_change',
        location: { lat: -33.8688, lng: -151.2093 }
      }, null, 2)
    },
    search: {
      id: 'search',
      method: 'GET',
      endpoint: '/api/search?q=PAE&type=modules',
      description: 'Buscar en la plataforma'
    },
    health: {
      id: 'health',
      method: 'GET',
      endpoint: '/api/health',
      description: 'Verificar estado de la API'
    }
  };

  const executeRequest = async () => {
    const request = requests[selectedRequest];
    setLoading(true);
    setError('');
    setResponse('');

    try {
      // Simular respuesta de API (en producción, hacer request real)
      const mockResponses: Record<string, string> = {
        modules: JSON.stringify({
          data: [
            { id: 'M01', name: 'Administración', vertical: 'PropTech', endpoints: 12 },
            { id: 'M02', name: 'Valoración', vertical: 'PropTech', endpoints: 15 },
            { id: 'M11', name: 'PAE M11', vertical: 'DataTech', endpoints: 25 }
          ],
          pagination: { total: 23, page: 1, limit: 5 }
        }, null, 2),
        moduleDetail: JSON.stringify({
          id: 'M01',
          name: 'Administración',
          vertical: 'PropTech',
          description: 'Gestión de comunidades, residentes y espacios comunes',
          endpoints: 12,
          status: 'active',
          version: '3.0.1'
        }, null, 2),
        paeAnalysis: JSON.stringify({
          analysis_id: 'ana_789456',
          asset_id: 'ast_123456',
          pae_score: 8.7,
          impact_level: 'high',
          narrative: 'El cambio de zonificación genera un efecto precesional positivo en la plusvalía territorial...',
          timestamp: new Date().toISOString()
        }, null, 2),
        search: JSON.stringify({
          results: [
            { id: 'M11', title: 'PAE M11', type: 'module', score: 0.98 },
            { id: 'analysis', title: 'Análisis Precesional', type: 'feature', score: 0.95 }
          ],
          count: 2
        }, null, 2),
        health: JSON.stringify({
          status: 'healthy',
          version: '3.0.0',
          timestamp: new Date().toISOString(),
          services: {
            database: 'ok',
            cache: 'ok',
            ai_engine: 'ok'
          }
        }, null, 2)
      };

      await new Promise(resolve => setTimeout(resolve, 800));
      setResponse(mockResponses[selectedRequest] || '{}');
    } catch (err) {
      setError('Error al ejecutar la solicitud. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const request = requests[selectedRequest];
  const methodColors: Record<string, string> = {
    GET: 'bg-blue-100 text-blue-700',
    POST: 'bg-green-100 text-green-700',
    PUT: 'bg-yellow-100 text-yellow-700',
    DELETE: 'bg-red-100 text-red-700'
  };

  return (
    <Card className="bg-white border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Prueba Interactiva de API</CardTitle>
        <CardDescription>Ejecuta requests en vivo contra los endpoints de DATAPOLIS</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Request Selector */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Selecciona un Endpoint:</h3>
            <div className="space-y-2">
              {Object.entries(requests).map(([key, req]) => (
                <button
                  key={key}
                  onClick={() => setSelectedRequest(key)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedRequest === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={methodColors[req.method]}>
                      {req.method}
                    </Badge>
                    <code className="font-mono text-sm text-gray-900">
                      {req.endpoint.split('?')[0]}
                    </code>
                  </div>
                  <p className="text-xs text-gray-600">{req.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-3">Detalles de la Solicitud:</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Método</label>
                  <Badge className={`${methodColors[request.method]} mt-1`}>
                    {request.method}
                  </Badge>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">Endpoint</label>
                  <code className="block text-sm text-gray-900 bg-white border rounded p-2 mt-1 font-mono">
                    {request.endpoint}
                  </code>
                </div>

                {request.params && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Parámetros</label>
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                      {Object.entries(request.params).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-mono">{key}:</span>
                          <span className="text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {request.body && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Body (JSON)</label>
                    <pre className="text-xs bg-white border rounded p-2 mt-1 overflow-x-auto">
                      {request.body}
                    </pre>
                  </div>
                )}
              </div>

              <Button
                onClick={executeRequest}
                disabled={loading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              >
                <Play size={16} className="mr-2" />
                {loading ? 'Ejecutando...' : 'Ejecutar Request'}
              </Button>
            </div>
          </div>
        </div>

        {/* Response */}
        <div className="mt-8 border-t pt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-gray-900">Respuesta:</h4>
            {response && (
              <button
                onClick={() => copyToClipboard(response, 'response')}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                {copiedId === 'response' ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} className="text-gray-600" />
                )}
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {response && (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-64">
              {response}
            </pre>
          )}

          {!response && !error && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
              <p className="text-sm">Selecciona un endpoint y haz clic en "Ejecutar Request" para ver la respuesta</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
