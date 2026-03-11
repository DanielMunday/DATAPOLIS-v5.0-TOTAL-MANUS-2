from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from enum import Enum

class HedonicModelType(str, Enum):
    LINEAR = "linear"
    LOG_LINEAR = "log_linear"
    DOUBLE_LOG = "double_log"
    BOX_COX = "box_cox"

class HedonicEstimateRequest(BaseModel):
    prices: List[float] = Field(..., description="Lista de precios observados")
    features: Dict[str, List[float]] = Field(..., description="Diccionario de atributos y valores")
    model_type: HedonicModelType = Field(default=HedonicModelType.LINEAR, description="Tipo de modelo econométrico")
    spatial_weights: Optional[List[List[float]]] = Field(None, description="Matriz de pesos espaciales")
    
    class Config:
        schema_extra = {
            "example": {
                "prices": [300000, 350000, 400000],
                "features": {
                    "area_sqm": [100, 120, 150],
                    "bedrooms": [2, 3, 3],
                    "distance_center_km": [5, 3, 2]
                },
                "model_type": "log_linear"
            }
        }

class HedonicEstimateResponse(BaseModel):
    model_type: str
    coefficients: List[float]
    standard_errors: List[float]
    t_statistics: List[float]
    r_squared: float
    mse: float
    n_observations: int
    n_variables: int
    vif: List[float]
    morans_i: Optional[float]
    elasticities: Dict[str, float]
    implicit_prices: List[float]
    residuals: List[float]

class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
