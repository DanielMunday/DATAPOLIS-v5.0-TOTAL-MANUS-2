import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Server, Database, Code } from "lucide-react";

export default function Installation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Guía de Instalación</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Pasos para desplegar DATAPOLIS v3.0 en un servidor local o en producción
          </p>
        </div>

        {/* Requirements */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Requisitos del Servidor</CardTitle>
            <CardDescription>Lo que necesitas antes de comenzar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Server size={20} /> Sistema Operativo
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>✓ Ubuntu 22.04 LTS (recomendado)</li>
                  <li>✓ 4GB RAM mínimo (8GB recomendado)</li>
                  <li>✓ 50GB almacenamiento SSD</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Code size={20} /> Software Requerido
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>✓ PHP 8.3</li>
                  <li>✓ Nginx</li>
                  <li>✓ Node.js 20.x</li>
                  <li>✓ Python 3.11</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Database size={20} /> Bases de Datos
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>✓ PostgreSQL 16 + PostGIS</li>
                  <li>✓ Redis</li>
                  <li>✓ ChromaDB</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20} /> Herramientas Adicionales
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>✓ Docker & Docker Compose</li>
                  <li>✓ Git</li>
                  <li>✓ Composer</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Installation Steps */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Pasos de Instalación</CardTitle>
            <CardDescription>Guía paso a paso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <h4 className="font-bold text-gray-900 text-lg">Clonar el Repositorio</h4>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <code>git clone [URL_REPO] datapolis_v3{'\n'}cd datapolis_v3</code>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <h4 className="font-bold text-gray-900 text-lg">Configurar Entorno Laravel</h4>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
                <div><code>composer install</code></div>
                <div><code>cp .env.example .env</code></div>
                <div><code>php artisan key:generate</code></div>
                <div><code>php artisan migrate --seed</code></div>
              </div>
              <p className="text-gray-600 text-sm mt-3">
                Editar .env con credenciales de base de datos y Redis
              </p>
            </div>

            {/* Step 3 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <h4 className="font-bold text-gray-900 text-lg">Configurar Entorno Python (ÁGORA)</h4>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
                <div><code>cd agora_services</code></div>
                <div><code>pip install -r requirements.txt</code></div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <h4 className="font-bold text-gray-900 text-lg">Instalar Dependencias Frontend</h4>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
                <div><code>cd frontend</code></div>
                <div><code>npm install</code></div>
                <div><code>npm run build</code></div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <h4 className="font-bold text-gray-900 text-lg">Iniciar Servicios</h4>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
                <div><code>docker-compose up -d</code></div>
                <div><code>php artisan serve</code></div>
                <div><code>python agora_services/main.py</code></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Docker Deployment */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Despliegue con Docker</CardTitle>
            <CardDescription>Opción recomendada para producción</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Se proporciona un archivo docker-compose.yml que configura todos los servicios automáticamente:
            </p>
            <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Servicios incluidos:</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>✓ Laravel Backend (PHP-FPM)</li>
                  <li>✓ PostgreSQL Database</li>
                  <li>✓ Redis Cache</li>
                  <li>✓ Python FastAPI (ÁGORA)</li>
                  <li>✓ Nginx Reverse Proxy</li>
                  <li>✓ ChromaDB Vector Store</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <code>docker-compose -f docker-compose.prod.yml up -d</code>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Configuración Importante</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Variables de Entorno (.env)</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><strong>DB_HOST:</strong> localhost (o IP del servidor PostgreSQL)</li>
                <li><strong>DB_DATABASE:</strong> datapolis_v3</li>
                <li><strong>REDIS_HOST:</strong> localhost</li>
                <li><strong>AGORA_API_URL:</strong> http://localhost:8000</li>
                <li><strong>APP_ENV:</strong> production (para producción)</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Seguridad</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>✓ Usar HTTPS en producción (certificado SSL/TLS)</li>
                <li>✓ Configurar firewall para permitir solo puertos necesarios</li>
                <li>✓ Usar contraseñas fuertes para bases de datos</li>
                <li>✓ Habilitar autenticación de dos factores</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Verification */}
        <Card className="bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Verificación de Instalación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Frontend Accesible</h4>
                  <p className="text-gray-600 text-sm">Navega a http://localhost:3000 (desarrollo) o tu dominio (producción)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">API Funcional</h4>
                  <p className="text-gray-600 text-sm">Prueba GET /api/health para verificar que el backend responde</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Base de Datos</h4>
                  <p className="text-gray-600 text-sm">Verifica que las tablas se crearon correctamente: php artisan tinker</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Servicios de IA</h4>
                  <p className="text-gray-600 text-sm">Prueba GET /api/agora/health para verificar que FastAPI responde</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
