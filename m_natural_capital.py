from typing import Dict
import logging
import math

logger = logging.getLogger(__name__)

class NaturalCapitalEngine:
    """
    Motor de contabilidad de capital natural.
    Implementa modelo bioeconómico tipo Schaefer.
    Calcula sostenibilidad, flujo máximo y precio sombra.
    """
    
    def __init__(self):
        self.results = None
    
    def estimate_natural_capital_value(
        self,
        stock: float,
        growth_rate: float,
        depreciation_rate: float,
        discount_rate: float,
        harvest_rate: float = 0.5
    ) -> Dict:
        """
        Estima valor de capital natural usando modelo Schaefer simplificado.
        
        Args:
            stock: Stock inicial de recurso (unidades)
            growth_rate: Tasa de crecimiento natural (%)
            depreciation_rate: Tasa de depreciación/agotamiento (%)
            discount_rate: Tasa de descuento (%)
            harvest_rate: Tasa de cosecha sostenible (0-1)
            
        Returns:
            Diccionario con resultados de valoración
        """
        try:
            # Convertir porcentajes a decimales
            r = growth_rate / 100
            d = depreciation_rate / 100
            rho = discount_rate / 100
            
            # Flujo natural (crecimiento - depreciación)
            net_growth_rate = r - d
            
            # Capacidad de carga (K) - stock máximo sostenible
            # En modelo Schaefer: K = stock / (1 - net_growth_rate)
            K = stock / (1 - net_growth_rate) if net_growth_rate < 1 else stock * 2
            
            # Máximo rendimiento sostenible (MSY)
            # En modelo Schaefer: MSY = K * net_growth_rate / 4
            msy = K * net_growth_rate / 4 if net_growth_rate > 0 else 0
            
            # Flujo sostenible actual
            sustainable_yield = stock * net_growth_rate * harvest_rate
            
            # Precio sombra (valor presente del flujo perpetuo)
            # Shadow Price = Flujo Sostenible / Tasa de Descuento
            shadow_price = sustainable_yield / rho if rho > 0 else sustainable_yield * 100
            
            # Valor total de capital natural
            total_value = stock * (shadow_price / stock) if stock > 0 else 0
            
            # Índice de sostenibilidad (0-1, donde 1 es máxima sostenibilidad)
            sustainability_index = min(sustainable_yield / msy, 1.0) if msy > 0 else 0
            
            results = {
                "stock": stock,
                "growth_rate": growth_rate,
                "depreciation_rate": depreciation_rate,
                "net_growth_rate": net_growth_rate * 100,
                "discount_rate": discount_rate,
                "carrying_capacity": K,
                "maximum_sustainable_yield": msy,
                "sustainable_yield_current": sustainable_yield,
                "shadow_price": shadow_price,
                "total_capital_value": total_value,
                "sustainability_index": sustainability_index,
                "status": self._get_sustainability_status(sustainability_index),
                "recommendations": self._get_recommendations(sustainability_index, net_growth_rate)
            }
            
            return results
            
        except Exception as e:
            logger.error(f"Error en valoración de capital natural: {str(e)}")
            raise
    
    def estimate_multiple_resources(
        self,
        resources: list,
        discount_rate: float = 0.05
    ) -> Dict:
        """
        Estima valor para múltiples recursos naturales.
        
        Args:
            resources: Lista de dicts con parámetros de cada recurso
            discount_rate: Tasa de descuento común
            
        Returns:
            Diccionario con resultados agregados
        """
        try:
            resource_results = []
            total_value = 0
            total_sustainable_yield = 0
            
            for resource in resources:
                result = self.estimate_natural_capital_value(
                    resource['stock'],
                    resource['growth_rate'],
                    resource['depreciation_rate'],
                    discount_rate,
                    resource.get('harvest_rate', 0.5)
                )
                resource_results.append(result)
                total_value += result['total_capital_value']
                total_sustainable_yield += result['sustainable_yield_current']
            
            results = {
                "resources": resource_results,
                "summary": {
                    "total_capital_value": total_value,
                    "total_sustainable_yield": total_sustainable_yield,
                    "number_of_resources": len(resources),
                    "discount_rate": discount_rate,
                    "average_sustainability_index": sum(r['sustainability_index'] for r in resource_results) / len(resources)
                }
            }
            
            return results
            
        except Exception as e:
            logger.error(f"Error en valoración múltiple de recursos: {str(e)}")
            raise
    
    def _get_sustainability_status(self, index: float) -> str:
        """Retorna estado de sostenibilidad basado en índice"""
        if index >= 0.8:
            return "Altamente Sostenible"
        elif index >= 0.6:
            return "Sostenible"
        elif index >= 0.4:
            return "Moderadamente Sostenible"
        elif index >= 0.2:
            return "Bajo Riesgo"
        else:
            return "Crítico - Requiere Intervención"
    
    def _get_recommendations(self, index: float, net_growth: float) -> list:
        """Genera recomendaciones basadas en índice de sostenibilidad"""
        recommendations = []
        
        if index < 0.5:
            recommendations.append("Reducir tasa de cosecha para permitir recuperación")
        
        if net_growth < 0:
            recommendations.append("Recurso en depreciación neta - implementar medidas de protección")
        
        if index >= 0.8:
            recommendations.append("Mantener políticas actuales de gestión")
        
        if index < 0.2:
            recommendations.append("Considerar suspensión temporal de cosecha")
        
        return recommendations

# Instancia global
natural_capital_engine = NaturalCapitalEngine()
