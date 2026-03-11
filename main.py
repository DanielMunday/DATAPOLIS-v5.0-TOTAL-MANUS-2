    # Check Redis
    try:
        await app.state.redis.ping()
        health["components"]["redis"] = "healthy"
    except Exception as e:
        health["components"]["redis"] = f"unhealthy: {str(e)}"
        health["status"] = "degraded"
    
    return health


@app.get("/metrics")
async def metrics():
    """Endpoint de métricas Prometheus"""
    return Response(
        content=generate_latest(),
        media_type=CONTENT_TYPE_LATEST
    )


# =====================================================
# IMPORTAR Y REGISTRAR ROUTERS
# =====================================================

# Importar router principal (agrupa todos los módulos)
from app.routers import api_router

# Registrar router principal con todos los endpoints
app.include_router(api_router)

# Routers adicionales pendientes de implementación:
# - auth: Autenticación JWT/OAuth
# - users: Gestión de usuarios
# - ms_mercado_suelo: Análisis mercado suelo
# - m00_expediente: Expediente universal
# - m01_propiedad: Ficha propiedad
# - m02_copropiedad: Gestión condominios
# - m05_arriendos: Cartera arriendos
# - m17_gires: Gestión riesgos (Esri)
# - m22_agora: NLU geoespacial


# =====================================================
# DOCUMENTACIÓN DE API
# =====================================================

# Información adicional para OpenAPI
tags_metadata = [
    {
        "name": "Autenticación",
        "description": "Endpoints de autenticación JWT y OAuth 2.0"
    },
    {
        "name": "Usuarios",
        "description": "Gestión de usuarios y perfiles"
    },
    {
        "name": "IE - Indicadores Económicos",
        "description": "Indicadores BCCh (UF, UTM, IPC, Dólar) con predicciones ARIMA"
    },
    {
        "name": "MS - Mercado Suelo",
        "description": "Análisis de mercado de suelo con ML hedonic pricing"
    },
    {
        "name": "M00 - Expediente Universal",
        "description": "Expediente digital único por propiedad"
    },
    {
        "name": "M01 - Ficha Propiedad",
        "description": "Ficha maestra de propiedades inmobiliarias"
    },
    {
        "name": "M02 - Copropiedad",
        "description": "Gestión de condominios según Ley 21.442"
    },
    {
        "name": "M03 - Credit Score",
        "description": "Score crediticio inmobiliario con explicabilidad SHAP"
    },
    {
        "name": "M04 - Valorización",
        "description": "Valorización IVS 2022 (Comparación, Costo, DCF)"
    },
    {
        "name": "M05 - Arriendos",
        "description": "Gestión de cartera de arriendos"
    },
    {
        "name": "M12 - Due Diligence",
        "description": "Due Diligence automatizado (150+ checks)"
    },
    {
        "name": "M17 - GIRES",
        "description": "Gestión Integral de Riesgos (sísmico, tsunami, inundación)"
    },
    {
        "name": "M22 - ÁGORA GeoViewer",
        "description": "Consultas geoespaciales con NLU y ArcGIS"
    }
]

app.openapi_tags = tags_metadata


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG,
        workers=4 if not settings.DEBUG else 1
    )
