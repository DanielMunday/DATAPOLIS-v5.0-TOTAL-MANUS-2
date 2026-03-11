import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Play, BookOpen, Lightbulb, ArrowRight } from "lucide-react";

export default function GettingStarted() {
  const tutorials = [
    {
      id: 1,
      title: "Primeros Pasos con DATAPOLIS",
      description: "Aprende a configurar tu primera instancia y acceder a la plataforma",
      duration: "15 min",
      level: "Principiante",
      topics: ["Instalación", "Configuración", "Acceso"]
    },
    {
      id: 2,
      title: "Gestión de Módulos",
      description: "Descubre cómo activar, configurar y utilizar los 23 módulos disponibles",
      duration: "25 min",
      level: "Intermedio",
      topics: ["Módulos", "Configuración", "Integración"]
    },
    {
      id: 3,
      title: "Análisis Precesional con PAE M11",
      description: "Domina el motor de análisis precesional para predicciones territoriales",
      duration: "40 min",
      level: "Avanzado",
      topics: ["PAE", "Análisis", "Predicción"]
    },
    {
      id: 4,
      title: "Integración de APIs",
      description: "Conecta DATAPOLIS con tus sistemas existentes mediante APIs",
      duration: "30 min",
      level: "Avanzado",
      topics: ["API", "Integración", "Desarrollo"]
    }
  ];

  const useCases = [
    {
      title: "Planificación Urbana Inteligente",
      description: "Utiliza DATAPOLIS para optimizar la planificación urbana con análisis precesional de efectos territoriales indirectos",
      vertical: "GovTech",
      benefits: ["Predicción de impactos", "Optimización de recursos", "Toma de decisiones basada en datos"],
      example: "Análisis de impacto de nuevo transporte público en plusvalía territorial"
    },
    {
      title: "Valoración Inmobiliaria Avanzada",
      description: "Realiza valoraciones más precisas considerando efectos precesionales y cambios regulatorios",
      vertical: "PropTech",
      benefits: ["Mayor precisión", "Análisis de riesgos", "Predicción de tendencias"],
      example: "Valoración de propiedades considerando cambios de zonificación futuros"
    },
    {
      title: "Cumplimiento Normativo Automatizado",
      description: "Automatiza la gestión de cumplimiento regulatorio con monitoreo continuo",
      vertical: "RegTech",
      benefits: ["Automatización", "Reducción de riesgos", "Auditoría continua"],
      example: "Monitoreo automático de cambios en normativa de copropiedad"
    },
    {
      title: "Análisis de Inversión Pública",
      description: "Evalúa el retorno de inversión pública considerando efectos precesionales",
      vertical: "FinTech",
      benefits: ["ROI mejorado", "Análisis de impacto", "Justificación de inversiones"],
      example: "Análisis de ROI de proyecto de infraestructura con efectos territoriales"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Instalación",
      description: "Descarga e instala DATAPOLIS en tu servidor",
      action: "Ver Guía de Instalación"
    },
    {
      number: 2,
      title: "Configuración Inicial",
      description: "Configura tus parámetros, conexiones y permisos",
      action: "Ver Configuración"
    },
    {
      number: 3,
      title: "Exploración de Módulos",
      description: "Familiarízate con los 23 módulos disponibles",
      action: "Ver Módulos"
    },
    {
      number: 4,
      title: "Primer Análisis",
      description: "Realiza tu primer análisis con el PAE M11",
      action: "Ver Tutorial PAE"
    },
    {
      number: 5,
      title: "Integración",
      description: "Conecta con tus sistemas existentes",
      action: "Ver API"
    }
  ];

  const levelColors: Record<string, string> = {
    "Principiante": "bg-green-100 text-green-700",
    "Intermedio": "bg-yellow-100 text-yellow-700",
    "Avanzado": "bg-red-100 text-red-700"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Comenzar con DATAPOLIS</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Guías paso a paso, tutoriales interactivos y casos de uso reales para dominar la plataforma
          </p>
        </div>

        {/* Quick Start Steps */}
        <Card className="mb-12 bg-white border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Ruta de Inicio Rápido</CardTitle>
            <CardDescription>5 pasos para comenzar a usar DATAPOLIS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 pb-4 border-b last:border-b-0">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    <a href="#" className="text-blue-600 text-sm font-semibold hover:underline mt-2 inline-flex items-center gap-1">
                      {step.action} <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tutorials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tutoriales Disponibles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="bg-white border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <CardDescription className="mt-1">{tutorial.description}</CardDescription>
                    </div>
                    <Play className="text-blue-600 flex-shrink-0" size={20} />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={levelColors[tutorial.level]}>
                      {tutorial.level}
                    </Badge>
                    <span className="text-xs text-gray-500">{tutorial.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-2">Temas cubiertos:</p>
                      <div className="flex flex-wrap gap-1">
                        {tutorial.topics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Play size={16} className="mr-2" />
                      Ver Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Casos de Uso Reales</h2>
          <div className="space-y-6">
            {useCases.map((useCase, idx) => (
              <Card key={idx} className="bg-white border-2">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-lg">{useCase.title}</CardTitle>
                      <CardDescription className="mt-1">{useCase.description}</CardDescription>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">
                      {useCase.vertical}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Beneficios:</h4>
                      <ul className="space-y-2">
                        {useCase.benefits.map((benefit, bidx) => (
                          <li key={bidx} className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">Ejemplo Práctico:</h4>
                      <p className="text-sm text-gray-600">{useCase.example}</p>
                      <Button variant="outline" className="w-full mt-4">
                        <Lightbulb size={16} className="mr-2" />
                        Ver Más Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="text-blue-600" />
              Recursos Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Documentación Completa</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Accede a la documentación técnica completa de todos los módulos
                </p>
                <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">
                  Leer Documentación →
                </a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Comunidad y Soporte</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Únete a nuestra comunidad y obtén soporte de expertos
                </p>
                <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">
                  Ir a Comunidad →
                </a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Webinars y Eventos</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Asiste a webinars en vivo y sesiones de capacitación
                </p>
                <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">
                  Ver Calendario →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
