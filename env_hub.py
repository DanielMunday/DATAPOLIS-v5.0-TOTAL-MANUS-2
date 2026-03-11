from fastapi import APIRouter, HTTPException
from typing import Dict, List, Optional, Tuple
from app.services.m_env_hub import env_hub
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/env-hub", tags=["Environmental Data"])

@router.get("/layers")
async def get_available_layers() -> Dict:
    """Retorna capas ambientales disponibles"""
    return env_hub.get_available_layers()

@router.get("/layers/{layer_name}")
async def get_layer_data(
    layer_name: str,
    minx: Optional[float] = None,
    miny: Optional[float] = None,
    maxx: Optional[float] = None,
    maxy: Optional[float] = None,
    parameters: Optional[List[str]] = None
) -> Dict:
    """Obtiene datos de una capa ambiental específica"""
    try:
        bbox = None
        if all(v is not None for v in [minx, miny, maxx, maxy]):
            bbox = (minx, miny, maxx, maxy)
        
        results = env_hub.get_layer_data(
            layer_name=layer_name,
            bbox=bbox,
            parameters=parameters
        )
        return results
    except ValueError as e:
        logger.error(f"Capa no válida: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error obteniendo datos: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multi-layer-analysis")
async def multi_layer_analysis(
    layers: List[str],
    minx: Optional[float] = None,
    miny: Optional[float] = None,
    maxx: Optional[float] = None,
    maxy: Optional[float] = None
) -> Dict:
    """Analiza múltiples capas ambientales conjuntamente"""
    try:
        bbox = None
        if all(v is not None for v in [minx, miny, maxx, maxy]):
            bbox = (minx, miny, maxx, maxy)
        
        results = env_hub.get_multi_layer_analysis(
            layers=layers,
            bbox=bbox
        )
        return results
    except Exception as e:
        logger.error(f"Error en análisis multi-capa: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/compliance-check")
async def validate_compliance(
    layer_name: str,
    parameters: Dict[str, float],
    standards: Optional[Dict[str, Tuple[float, float]]] = None
) -> Dict:
    """Valida cumplimiento de estándares ambientales"""
    try:
        results = env_hub.validate_environmental_compliance(
            layer_name=layer_name,
            parameters=parameters,
            standards=standards
        )
        return results
    except Exception as e:
        logger.error(f"Error en validación: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
