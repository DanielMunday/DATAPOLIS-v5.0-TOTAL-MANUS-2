from fastapi import APIRouter, HTTPException
from typing import Dict
from app.services.m_valuation_advisor import advisor
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/valuation-advisor", tags=["Valuation Advisor"])

@router.post("/recommend")
async def recommend_valuation_method(
    purpose: str,
    asset_type: str,
    data_quality: str
) -> Dict:
    """Recomienda método de valoración más apropiado"""
    try:
        results = advisor.recommend_valuation_method(
            purpose=purpose,
            asset_type=asset_type,
            data_quality=data_quality
        )
        return results
    except ValueError as e:
        logger.error(f"Parámetro inválido: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error en recomendación: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/purposes")
async def get_valuation_purposes() -> Dict:
    """Retorna propósitos de valoración disponibles"""
    return {
        "purposes": [
            "investment",
            "taxation",
            "litigation",
            "regulation",
            "insurance",
            "environmental"
        ]
    }

@router.get("/asset-types")
async def get_asset_types() -> Dict:
    """Retorna tipos de activos disponibles"""
    return {
        "asset_types": [
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "natural",
            "mixed"
        ]
    }

@router.get("/data-qualities")
async def get_data_qualities() -> Dict:
    """Retorna niveles de calidad de datos"""
    return {
        "data_qualities": [
            "excellent",
            "good",
            "fair",
            "poor"
        ]
    }
