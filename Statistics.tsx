import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Zap, Database } from "lucide-react";

export default function Statistics() {
  // Datos de uso de módulos
  const moduleUsageData = [
    { name: "Administración", value: 2450, percentage: 28 },
    { name: "Valoración", value: 1890, percentage: 22 },
    { name: "PAE M11", value: 2100, percentage: 24 },
    { name: "Compliance", value: 1650, percentage: 19 },
    { name: "Otros", value: 410, percentage: 7 }
  ];

  // Datos de crecimiento de análisis
  const analysisGrowthData = [
    { month: "Ene", analisis: 450, usuarios: 240 },
    { month: "Feb", analisis: 620, usuarios: 340 },
    { month: "Mar", analisis: 890, usuarios: 520 },
    { month: "Abr", analisis: 1200, usuarios: 780 },
    { month: "May", analisis: 1580, usuarios: 1050 },
    { month: "Jun", analisis: 1950, usuarios: 1320 }
  ];

  // Datos de verticales
  const verticalData = [
    { name: "PropTech", value: 35, color: "#3b82f6" },
    { name: "FinTech", value: 25, color: "#10b981" },
    { name: "LegalTech", value: 20, color: "#f59e0b" },
    { name: "RegTech", value: 12, color: "#ef4444" },
    { name: "DataTech", value: 8, color: "#8b5cf6" }
  ];

  // Estadísticas clave
  const stats = [
    {
      label: "Análisis Realizados",
      value: "8,450",
      change: "+23%",
      icon: <Zap className="w-6 h-6 text-blue-600" />
    },
    {
      label: "Usuarios Activos",
      value: "1,320",
      change: "+15%",
      icon: <Users className="w-6 h-6 text-green-600" />
    },
    {
      label: "Activos Procesados",
      value: "12,890",
      change: "+42%",
      icon: <Database className="w-6 h-6 text-purple-600" />
    },
    {
      label: "Uptime",
      value: "99.98%",
      change: "Excelente",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard de Estadísticas</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Métricas de uso, rendimiento y adopción de la plataforma DATAPOLIS
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-white border-2">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  {stat.icon}
                </div>
                <p className="text-sm text-green-600 font-semibold">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Module Usage */}
          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle className="text-xl">Uso de Módulos</CardTitle>
              <CardDescription>Distribución de análisis por módulo (últimos 30 días)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moduleUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Vertical Distribution */}
          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle className="text-xl">Distribución por Vertical</CardTitle>
              <CardDescription>Porcentaje de uso por vertical de negocio</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={verticalData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {verticalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Growth Chart */}
        <Card className="bg-white border-2 mb-12">
          <CardHeader>
            <CardTitle className="text-xl">Crecimiento de Análisis y Usuarios</CardTitle>
            <CardDescription>Tendencia de análisis realizados y usuarios activos (últimos 6 meses)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={analysisGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="analisis" stroke="#3b82f6" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="usuarios" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle className="text-lg">Tiempo Promedio de Respuesta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 mb-2">245ms</div>
              <p className="text-sm text-gray-600">Bajo latencia en todas las regiones</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">85% de solicitudes &lt; 300ms</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle className="text-lg">Tasa de Éxito de API</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600 mb-2">99.98%</div>
              <p className="text-sm text-gray-600">Disponibilidad del servicio</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "99.98%" }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Tiempo de inactividad: &lt; 1 minuto/mes</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2">
            <CardHeader>
              <CardTitle className="text-lg">Satisfacción de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-600 mb-2">4.8/5</div>
              <p className="text-sm text-gray-600">Basado en 320 reseñas</p>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Recomendación: 96%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
