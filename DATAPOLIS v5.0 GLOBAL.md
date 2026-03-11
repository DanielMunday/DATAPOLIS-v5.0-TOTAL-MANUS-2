# DATAPOLIS v5.0 GLOBAL

## Plataforma Integral de Análisis Territorial Precesional

**Versión:** 5.0.0  
**Estado:** Production Ready  
**Fecha:** 2026-03-09  
**Autor:** Manus AI

---

## 📋 Descripción General

DATAPOLIS v5.0 es una plataforma de análisis territorial precesional que integra múltiples disciplinas (econometría espacial, servicios ecosistémicos, riesgo sistémico, análisis jurídico) para proporcionar evaluaciones holísticas de propiedades y territorios.

### Características Principales

- **Kernel Precesional (M09):** Motor central que calcula ángulos, radios y scores precesionales
- **Análisis Hedónico Espacial (M-HED):** Modelos econométricos (OLS, SAR, SEM, SDM)
- **Servicios Ecosistémicos (M-ESV):** Valoración de capital natural
- **Análisis de Riesgo (M-RISK):** Evaluación de riesgos sistémicos
- **Mapas Interactivos (2D/3D):** Visualización geoespacial con Deck.gl/Cesium
- **Reportes Inteligentes:** Generación automática de narrativas y documentos

---

## 🏗️ Arquitectura

### Stack Tecnológico

**Backend:**
- Python 3.11+ (FastAPI, NumPy, SciPy, Pandas)
- Node.js 22+ (Express, tRPC, TypeScript)
- PostgreSQL (datos relacionales)
- Neo4j (grafo precesional)
- Redis (caché)

**Frontend:**
- React 19 + Vite
- Tailwind CSS 4
- Deck.gl (mapas 2D/3D)
- Cesium.js (visualización 3D)
- Recharts (gráficos)

**DevOps:**
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Kubernetes (orchestración)

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTACIÓN (React)                      │
│  ┌─────────────┬──────────────┬──────────────┬────────────┐  │
│  │  Dashboard  │  MapView     │  Analysis    │  Reports   │  │
│  └─────────────┴──────────────┴──────────────┴────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ tRPC
┌────────────────────────┴────────────────────────────────────┐
│              ORQUESTACIÓN (Node.js + Express)               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Gateway | Autenticación | Rate Limiting        │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼──────┐  ┌──────▼──────┐  ┌────▼──────────┐
│  Kernel      │  │  Hedonic    │  │  Ecosystem   │
│  Precesional │  │  Pricing    │  │  Services    │
│  (Python)    │  │  (Python)   │  │  (Python)    │
└──────────────┘  └─────────────┘  └──────────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼──────┐  ┌──────▼──────┐  ┌────▼──────────┐
│ PostgreSQL   │  │  Neo4j      │  │  Redis       │
│ (Datos)      │  │  (Grafo)    │  │  (Caché)     │
└──────────────┘  └─────────────┘  └──────────────┘
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- Python 3.11+
- Node.js 22+
- Docker & Docker Compose
- PostgreSQL 14+
- Neo4j 5+

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/datapolis/datapolis-v5.git
cd datapolis-v5

# Crear ambiente Python
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias Python
pip install -r backend/requirements.txt

# Instalar dependencias Node.js
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales locales

# Ejecutar migraciones de BD
python backend/migrations/init_db.py

# Iniciar servicios con Docker Compose
docker-compose up -d

# Iniciar backend
npm run dev:backend

# Iniciar frontend (en otra terminal)
npm run dev:frontend
```

### Acceso a la Aplicación

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Docs:** http://localhost:3001/api/docs
- **Health Check:** http://localhost:3001/health

---

## 📊 Módulos Principales

### 1. Kernel Precesional (M09)

Calcula análisis precesionales basados en:
- **Ángulos:** 0°, 45°, 90°, 135°, 180°
- **Radios:** 300m, 500m, 1km, 2km, 5km
- **Scores:** Precesional, Oportunidad, Riesgo, Confianza
- **Multiplicador:** 0.5x - 2.0x

```python
from backend.kernel_precesional import PrecessionKernel, PropertyData, Location

kernel = PrecessionKernel()
property_data = PropertyData(
    id="PROP_001",
    location=Location(-33.4489, -70.6693),
    area_sqm=200,
    # ... más atributos
)

result = kernel.analyze_property(property_data, neighborhood_context)
print(result['scores'])
```

### 2. Módulo Hedónico (M-HED)

Modelos econométricos espaciales:
- **OLS:** Mínimos cuadrados ordinarios
- **SAR:** Spatial Autoregressive
- **SEM:** Spatial Error Model
- **SDM:** Spatial Durbin Model

```python
from backend.m_hedonic import HedonicEngine

engine = HedonicEngine()
y, X, W = engine.prepare_data(df, 'value_per_sqm', features, locations)

model_sar = engine.fit_sar(y, X, W)
print(engine.summary(model_sar))
```

### 3. Servicios Ecosistémicos (M-ESV)

Valoración de capital natural:
- Secuestro de carbono
- Regulación hídrica
- Polinización
- Recreación
- Otros servicios

### 4. Análisis de Riesgo (M-RISK)

Evaluación de riesgos:
- Riesgo de morosidad
- Riesgo de mercado
- Riesgo de concentración
- Riesgo sistémico
- VaR (95%) y CVaR

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests unitarios
pytest tests/unit/ -v

# Tests de integración
pytest tests/integration/ -v

# Tests con cobertura
pytest tests/ --cov=backend --cov-report=html

# Tests de performance
pytest tests/test_performance.py -v
```

### Casos Piloto

```bash
# Ejecutar piloto de Santiago
python data/pilot_cases/santiago_pilot.py

# Resultados guardados en: data/pilot_cases/santiago_results.json
```

---

## 📈 API Reference

### Endpoints Principales

#### Análisis Precesional

```http
POST /trpc/precession.analyze
Content-Type: application/json

{
  "property": {
    "id": "PROP_001",
    "latitude": -33.4489,
    "longitude": -70.6693,
    "area_sqm": 200,
    "use_type": "residential",
    ...
  },
  "neighborhood_context": {
    "crime_rate": 0.02,
    "default_rate": 0.03,
    ...
  }
}
```

#### Predicción Hedónica

```http
GET /trpc/hedonic.predictValue?area_sqm=200&age_years=10&bedrooms=3&bathrooms=2&parking=1&latitude=-33.4489&longitude=-70.6693
```

#### Servicios Ecosistémicos

```http
GET /trpc/ecosystemServices.calculateESV?latitude=-33.4489&longitude=-70.6693&land_use=residential&area_sqm=200
```

#### Análisis de Riesgo

```http
GET /trpc/risk.analyzePortfolioRisk?property_ids=PROP_001,PROP_002&time_horizon=5
```

---

## 🔐 Seguridad

- Autenticación: JWT + OAuth 2.0
- Autorización: RBAC (Role-Based Access Control)
- Encriptación: TLS 1.3 + AES-256
- Rate Limiting: 1000 req/min por usuario
- CORS: Configurado para dominios autorizados

---

## 📝 Documentación Adicional

- [Guía de Arquitectura](./docs/ARCHITECTURE.md)
- [Referencia de API](./docs/API_REFERENCE.md)
- [Guía de Despliegue Local](./docs/DEPLOY_LOCAL.md)
- [Guía de Despliegue cPanel](./docs/DEPLOY_CPANEL.md)
- [Propuesta para Inversores](./docs/DATAPOLIS_v4_INVERSIONISTAS.md)

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

DATAPOLIS v5.0 está bajo licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

---

## 📞 Contacto

- **Email:** info@datapolis.city
- **Website:** https://datapolis.city
- **GitHub:** https://github.com/datapolis
- **Documentación:** https://docs.datapolis.city

---

## 🎯 Roadmap 2026-2028

| Período | Hitos | Inversión |
|---------|-------|-----------|
| **Q1-Q2 2026** | MVP, Pilotos en Santiago | USD 500K |
| **Q3-Q4 2026** | Lanzamiento oficial, 15 clientes | USD 400K |
| **Q1-Q2 2027** | Expansión a Perú, 80 clientes | USD 800K |
| **Q3-Q4 2027** | Entrada a Colombia, EBITDA positivo | USD 600K |
| **2028** | Ronda Serie A, 200 clientes, ARR USD 7.5M | USD 2M |

---

**Última actualización:** 2026-03-09  
**Versión:** 5.0.0  
**Estado:** ✅ Production Ready
