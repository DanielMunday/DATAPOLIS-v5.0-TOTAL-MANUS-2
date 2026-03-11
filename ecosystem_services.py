from fastapi import APIRouter, HTTPException
from typing import Dict, List
from app.services.m_ecosystem_services import ecosystem_engine
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ecosystem", tags=["Ecosystem Services"])

@router.post("/value")
async def estimate_ecosystem_value(
    ecosystem_type: str,
    area_hectares: float,
    discount_rate: float = 0.05,
    horizon_years: int = 30
) -> Dict:
    """Estima valor económico de un ecosistema"""
    try:
        results = ecosystem_engine.estimate_ecosystem_value(
            ecosystem_type=ecosystem_type,
            area_hectares=area_hectares,
            discount_rate=discount_rate,
            horizon_years=horizon_years
        )
        return results
    except Exception as e:
        logger.error(f"Error en valoración ecosistémica: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/multiple")
async def estimate_multiple_ecosystems(
    ecosystems: List[Dict],
    discount_rate: float = 0.05,
    horizon_years: int = 30
) -> Dict:
    """Estima valor para múltiples ecosistemas"""
    try:
        results = ecosystem_engine.estimate_multiple_ecosystems(
            ecosystems=ecosystems,
            discount_rate=discount_rate,
            horizon_years=horizon_years
        )
        return results
    except Exception as e:
        logger.error(f"Error en valoración múltiple: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/types")
async def get_ecosystem_types() -> Dict:
    """Retorna tipos de ecosistemas disponibles"""
    return {
        "types": list(ecosystem_engine.ECOSYSTEM_VALUES.keys()),
        "values_usd_per_hectare_year": ecosystem_engine.ECOSYSTEM_VALUES
    }
