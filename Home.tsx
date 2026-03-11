import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, BarChart3, MapPin, Brain, Code } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "23 Módulos Integrados",
      description: "Ecosistema completo de PropTech, FinTech, RegTech y GovTech"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Motor PAE M11",
      description: "Análisis predictivo de transformaciones territoriales"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Cumplimiento Normativo",
      description: "NCG 514, Ley Copropiedad 21.442 y normativas chilenas"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Inteligencia Territorial",
      description: "Análisis de plusvalías y diagnóstico urbano"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Arquitectura Dual-Stack",
      description: "Laravel 11 + Vue 3 + Python FastAPI + IA"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "150+ Endpoints API",
      description: "Integración completa y escalable"
    }
  ];

  const sections = [
    {
      title: "Arquitectura Técnica",
      description: "Explora la arquitectura dual-stack robusta y desacoplada",
      href: "/architecture",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Módulos Funcionales",
      description: "Descubre los 23 módulos que forman el ecosistema",
      href: "/modules",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Motor PAE M11",
      description: "Entiende el análisis precesional y su integración",
      href: "/pae",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Análisis Estratégico",
      description: "Análisis FODA y oportunidades de mercado",
      href: "/analysis",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Plataforma Integral de Gestión Inmobiliaria
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            DATAPOLIS <span className="text-blue-600">v3.0</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ecosistema tecnológico integral para la gestión, valorización y cumplimiento normativo de activos inmobiliarios en Chile
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/architecture">
              <Button size="lg" className="w-full sm:w-auto">
                Explorar Arquitectura <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="/modules">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Ver Módulos
              </Button>
            </a>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-3xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">Módulos</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-3xl font-bold text-green-600">150+</div>
              <div className="text-sm text-gray-600">Endpoints API</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-3xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Verticales</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-3xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Características Principales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Sections */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Explora la Plataforma</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <a key={idx} href={section.href} className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-blue-600 group-hover:translate-x-2 transition-transform">
                    Explorar <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para explorar DATAPOLIS?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Accede a la documentación técnica completa, arquitectura detallada y guías de implementación
          </p>
          <a href="/architecture">
            <Button size="lg" variant="secondary">
              Comenzar Exploración
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
