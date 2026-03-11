# DATAPOLIS v4.0

**Plataforma Integral PropTech + FinTech + RegTech + GovTech + ESG/Capital Natural**

## Descripción General

DATAPOLIS v4.0 es una plataforma de software empresarial que integra gestión inmobiliaria, análisis financiero, cumplimiento regulatorio, gobernanza pública y valoración de capital natural en un único ecosistema tecnológico.

La versión 4.0 añade una capa avanzada de **ESG y Capital Natural**, incluyendo:

- **Precios Hedónicos Espaciales**: Modelos econométricos (OLS, log-lineal, double-log, Box-Cox, SAR/SEM) para valoración implícita de atributos.
- **Servicios Ecosistémicos**: Valoración de beneficios ambientales (bosques, humedales, parques, marino-costero).
- **Contabilidad de Capital Natural**: Modelos bioeconómicos (Schaefer) para sostenibilidad y precio sombra.
- **Valuation Method Advisor**: Motor de recomendación de métodos de valoración (Income, Market, Asset, Hedonic, ML, Natural Capital).
- **Environmental Data Hub**: Hub unificado de datos ambientales (calidad de aire, agua, uso de suelo).

## Módulos Principales

### v3.0 (Núcleo Consolidado)
- M00: Administración y Gestión
- M01-M10: Módulos de Valoración Inmobiliaria
- M11: PAE (Precession Analytics Engine)
- M12-M22: Módulos de Compliance, Finanzas y Regulación

### v4.0 (Nueva Capa ESG/Capital Natural)
- M23: Hedonic Pricing Engine
- M24: Ecosystem Services Valuation
- M25: Natural Capital Accounting
- M26: Valuation Method Advisor
- M27: Environmental Data Hub

## Instalación Rápida

### Requisitos Previos
- Python 3.9+
- Node.js 16+
- PostgreSQL 12+
- Redis 6+

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/datapolis/datapolis-v4.git
cd datapolis-v4

# Backend FastAPI
cd backend/fastapi
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Frontend Vue 3 (en otra terminal)
cd frontend
npm install
npm run dev
```

## Documentación

- [Arquitectura Técnica](docs/ARCHITECTURE.md)
- [Referencia de API](docs/API_REFERENCE.md)
- [Despliegue Local](docs/DEPLOY_LOCAL.md)
- [Despliegue cPanel](docs/DEPLOY_CPANEL.md)
- [Propuesta para Inversores](docs/DATAPOLIS_v4_INVERSIONISTAS.md)
- [Guía para Clientes](docs/DATAPOLIS_v4_CLIENTES.md)
- [Enfoque Regulador](docs/DATAPOLIS_v4_REGULADOR.md)

## Estructura del Proyecto

```
DATAPOLIS_v4/
├── backend/
│   ├── fastapi/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── services/
│   │   │   ├── routers/
│   │   │   └── schemas/
│   │   ├── requirements.txt
│   │   └── openapi.yaml
│   └── laravel/
│       └── routes/
├── frontend/
│   └── src/
│       ├── views/
│       ├── services/
│       └── router/
├── tests/
├── docs/
├── scripts/
└── VERSION
```

## Características Principales

### Análisis Hedónico Espacial
Estima precios implícitos de atributos inmobiliarios usando econometría espacial avanzada.

### Valoración de Ecosistemas
Calcula el valor económico de servicios ambientales por hectárea y horizonte temporal.

### Capital Natural
Modela sostenibilidad y precio sombra de recursos naturales usando bioeconometría.

### Asesor de Valoración
Recomienda el método de valoración más apropiado según contexto y datos disponibles.

### Hub de Datos Ambientales
Integra capas de datos ambientales (aire, agua, suelo) para análisis holístico.

## Tecnología

- **Backend**: FastAPI (Python), Laravel (PHP)
- **Frontend**: Vue 3, Leaflet Maps
- **Base de Datos**: PostgreSQL, Redis
- **Análisis**: statsmodels, pysal, geopandas, scikit-learn
- **Despliegue**: Docker, Kubernetes, cPanel

## Licencia

Propietaria. Todos los derechos reservados © 2026 DATAPOLIS.

## Contacto

Para consultas técnicas o comerciales:
- Email: info@datapolis.io
- Web: www.datapolis.io
