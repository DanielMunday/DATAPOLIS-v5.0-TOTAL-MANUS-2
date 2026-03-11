from fastapi import APIRouter, HTTPException
from typing import Dict, List
from app.services.m_natural_capital import natural_capital_engine
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/natural-capital", tags=["Natural Capital"])

@router.post("/price")
async def estimate_natural_capital_price(
    stock: float,
    growth_rate: float,
    depreciation_rate: float,
    discount_rate: float = 0.05,
    harvest_rate: float = 0.5
) -> Dict:
    """Estima precio sombra de capital natural"""
    try:
        results = natural_capital_engine.estimate_natural_capital_value(
            stock=stock,
            growth_rate=growth_rate,
            depreciation_rate=depreciation_rate,
            discount_rate=discount_rate,
            harvest_rate=harvest_rate
        )
        return results
    except Exception as e:
        logger.error(f"Error en valoración de capital natural: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/multiple")
async def estimate_multiple_resources(
    resources: List[Dict],
    discount_rate: float = 0.05
) -> Dict:
    """Estima valor para múltiples recursos naturales"""
    try:
        results = natural_capital_engine.estimate_multiple_resources(
            resources=resources,
            discount_rate=discount_rate
        )
        return results
    except Exception as e:
        logger.error(f"Error en valoración múltiple: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
