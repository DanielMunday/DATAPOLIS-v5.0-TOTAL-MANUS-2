from typing import Dict, List, Optional
from dataclasses import dataclass
import logging

logger = logging.getLogger(__name__)

@dataclass
class EcosystemValue:
    """Estructura para valores de ecosistemas"""
    ecosystem_type: str
    value_per_hectare: float  # USD/ha/año
    area_hectares: float
    annual_value: float
    npv: float
    discount_rate: float
    horizon_years: int

class EcosystemServicesEngine:
    """
    Motor de valoración de servicios ecosistémicos.
    Calcula valor económico de beneficios ambientales.
    """
    
    # Valores de referencia por hectárea (USD/ha/año)
    ECOSYSTEM_VALUES = {
        "bosque": 2500,
        "humedal": 4200,
        "parque": 1800,
        "marino_costero": 5600,
        "pradera": 800,
        "agricola": 1200
    }
    
    def __init__(self):
        self.results = None
    
    def estimate_ecosystem_value(
        self,
        ecosystem_type: str,
        area_hectares: float,
        discount_rate: float = 0.05,
        horizon_years: int = 30
    ) -> Dict:
        """
        Estima el valor económico de un ecosistema.
        
        Args:
            ecosystem_type: Tipo de ecosistema (bosque, humedal, parque, marino_costero, etc.)
            area_hectares: Área en hectáreas
            discount_rate: Tasa de descuento anual
            horizon_years: Horizonte de evaluación en años
            
        Returns:
            Diccionario con resultados de valoración
        """
        try:
            # Obtener valor por hectárea
            value_per_hectare = self.ECOSYSTEM_VALUES.get(
                ecosystem_type.lower(),
                1500  # Valor por defecto
            )
            
            # Calcular valor anual
            annual_value = value_per_hectare * area_hectares
            
            # Calcular NPV
            npv = self._calculate_npv(annual_value, discount_rate, horizon_years)
            
            results = {
                "ecosystem_type": ecosystem_type,
                "area_hectares": area_hectares,
                "value_per_hectare_annual": value_per_hectare,
                "annual_value": annual_value,
                "discount_rate": discount_rate,
                "horizon_years": horizon_years,
                "npv": npv,
                "total_value_period": annual_value * horizon_years,  # Valor sin descuento
                "methodology": "Value Transfer Method",
                "confidence": "Medium"
            }
            
            return results
            
        except Exception as e:
            logger.error(f"Error en valoración de ecosistema: {str(e)}")
            raise
    
    def estimate_multiple_ecosystems(
        self,
        ecosystems: List[Dict],
        discount_rate: float = 0.05,
        horizon_years: int = 30
    ) -> Dict:
        """
        Estima valor para múltiples ecosistemas.
        
        Args:
            ecosystems: Lista de dicts con 'type' y 'area_hectares'
            discount_rate: Tasa de descuento
            horizon_years: Horizonte de evaluación
            
        Returns:
            Diccionario con resultados agregados
        """
        try:
            ecosystem_results = []
            total_area = 0
            total_annual_value = 0
            total_npv = 0
            
            for eco in ecosystems:
                result = self.estimate_ecosystem_value(
                    eco['type'],
                    eco['area_hectares'],
                    discount_rate,
                    horizon_years
                )
                ecosystem_results.append(result)
                total_area += eco['area_hectares']
                total_annual_value += result['annual_value']
                total_npv += result['npv']
            
            results = {
                "ecosystems": ecosystem_results,
                "summary": {
                    "total_area_hectares": total_area,
                    "total_annual_value": total_annual_value,
                    "total_npv": total_npv,
                    "average_value_per_hectare": total_annual_value / total_area if total_area > 0 else 0,
                    "discount_rate": discount_rate,
                    "horizon_years": horizon_years
                }
            }
            
            return results
            
        except Exception as e:
            logger.error(f"Error en valoración múltiple: {str(e)}")
            raise
    
    def _calculate_npv(self, annual_value: float, discount_rate: float, horizon_years: int) -> float:
        """
        Calcula NPV usando fórmula de anualidad.
        NPV = Valor_Anual * [(1 - (1 + r)^-n) / r]
        """
        if discount_rate == 0:
            return annual_value * horizon_years
        
        npv = annual_value * ((1 - (1 + discount_rate)**(-horizon_years)) / discount_rate)
        return float(npv)
    
    def update_ecosystem_value(self, ecosystem_type: str, new_value: float):
        """Permite actualizar valores de referencia"""
        self.ECOSYSTEM_VALUES[ecosystem_type.lower()] = new_value
        logger.info(f"Valor de {ecosystem_type} actualizado a {new_value} USD/ha/año")

# Instancia global
ecosystem_engine = EcosystemServicesEngine()
