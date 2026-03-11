import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ArchitectureDiagram() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const components = [
    {
      id: 'frontend',
      name: 'Frontend',
      tech: 'Vue 3 + Vite',
      color: 'bg-green-100 border-green-300',
      description: 'Interfaz de usuario responsiva y moderna',
      position: 'top-0 left-1/2 transform -translate-x-1/2'
    },
    {
      id: 'backend',
      name: 'Backend',
      tech: 'Laravel 11',
      color: 'bg-blue-100 border-blue-300',
      description: 'Lógica de negocio y orquestación',
      position: 'top-1/3 left-1/4 transform -translate-x-1/2'
    },
    {
      id: 'db',
      name: 'PostgreSQL',
      tech: 'DB Principal',
      color: 'bg-purple-100 border-purple-300',
      description: 'Almacenamiento transaccional',
      position: 'top-1/3 right-1/4 transform translate-x-1/2'
    },
    {
      id: 'ai',
      name: 'Motor IA',
      tech: 'FastAPI',
      color: 'bg-orange-100 border-orange-300',
      description: 'Análisis territorial y ML',
      position: 'top-2/3 left-1/4 transform -translate-x-1/2'
    },
    {
      id: 'redis',
      name: 'Redis',
      tech: 'Event Bus',
      color: 'bg-red-100 border-red-300',
      description: 'Comunicación asíncrona',
      position: 'top-2/3 right-1/4 transform translate-x-1/2'
    },
    {
      id: 'chroma',
      name: 'ChromaDB',
      tech: 'Vector Store',
      color: 'bg-indigo-100 border-indigo-300',
      description: 'Embeddings para RAG',
      position: 'bottom-0 left-1/2 transform -translate-x-1/2'
    }
  ];

  return (
    <Card className="bg-white border-2 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">Arquitectura del Sistema</CardTitle>
        <CardDescription>Haz clic en cualquier componente para más detalles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8">
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Frontend to Backend */}
            <line x1="50%" y1="60" x2="25%" y2="140" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
            {/* Frontend to DB */}
            <line x1="50%" y1="60" x2="75%" y2="140" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
            {/* Backend to Redis */}
            <line x1="25%" y1="200" x2="75%" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
            {/* Backend to AI */}
            <line x1="25%" y1="200" x2="25%" y2="260" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
            {/* AI to ChromaDB */}
            <line x1="25%" y1="320" x2="50%" y2="360" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" />
            {/* Redis to ChromaDB */}
            <line x1="75%" y1="260" x2="50%" y2="360" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" />
          </svg>

          {/* Components */}
          <div className="relative w-full h-full" style={{ zIndex: 2 }}>
            {components.map((comp) => (
              <div
                key={comp.id}
                className={`absolute w-32 cursor-pointer transition-all transform hover:scale-105 ${comp.position}`}
                onClick={() => setSelectedComponent(selectedComponent === comp.id ? null : comp.id)}
              >
                <div
                  className={`border-2 rounded-lg p-3 text-center ${comp.color} ${
                    selectedComponent === comp.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                >
                  <h4 className="font-bold text-sm text-gray-900">{comp.name}</h4>
                  <Badge variant="outline" className="text-xs mt-1">
                    {comp.tech}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        {selectedComponent && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            {components
              .filter((c) => c.id === selectedComponent)
              .map((comp) => (
                <div key={comp.id}>
                  <h4 className="font-bold text-gray-900">{comp.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{comp.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Tecnología:</strong> {comp.tech}
                  </p>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
