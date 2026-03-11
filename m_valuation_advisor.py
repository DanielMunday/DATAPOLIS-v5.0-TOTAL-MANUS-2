from typing import Dict, List
from enum import Enum
import logging

logger = logging.getLogger(__name__)

class ValuationPurpose(str, Enum):
    INVESTMENT = "investment"
    TAXATION = "taxation"
    LITIGATION = "litigation"
    REGULATION = "regulation"
    INSURANCE = "insurance"
    ENVIRONMENTAL = "environmental"

class AssetType(str, Enum):
    RESIDENTIAL = "residential"
    COMMERCIAL = "commercial"
    INDUSTRIAL = "industrial"
    AGRICULTURAL = "agricultural"
    NATURAL = "natural"
    MIXED = "mixed"

class DataQuality(str, Enum):
    EXCELLENT = "excellent"
    GOOD = "good"
    FAIR = "fair"
    POOR = "poor"

class ValuationMethod(str, Enum):
    INCOME = "income"
    MARKET = "market"
    ASSET = "asset"
    HEDONIC = "hedonic"
    ML = "machine_learning"
    NATURAL_CAPITAL = "natural_capital"

class ValuationAdvisor:
    """
    Motor de recomendación de métodos de valoración.
    Recomienda el método más apropiado según contexto.
    """
    
    # Matriz de recomendaciones: (propósito, tipo_activo, calidad_datos) -> método
    RECOMMENDATION_MATRIX = {
        (ValuationPurpose.INVESTMENT, AssetType.RESIDENTIAL, DataQuality.EXCELLENT): ValuationMethod.MARKET,
        (ValuationPurpose.INVESTMENT, AssetType.RESIDENTIAL, DataQuality.GOOD): ValuationMethod.HEDONIC,
        (ValuationPurpose.INVESTMENT, AssetType.COMMERCIAL, DataQuality.EXCELLENT): ValuationMethod.INCOME,
        (ValuationPurpose.INVESTMENT, AssetType.COMMERCIAL, DataQuality.GOOD): ValuationMethod.MARKET,
        (ValuationPurpose.INVESTMENT, AssetType.AGRICULTURAL, DataQuality.GOOD): ValuationMethod.HEDONIC,
        (ValuationPurpose.INVESTMENT, AssetType.NATURAL, DataQuality.GOOD): ValuationMethod.NATURAL_CAPITAL,
        
        (ValuationPurpose.TAXATION, AssetType.RESIDENTIAL, DataQuality.EXCELLENT): ValuationMethod.MARKET,
        (ValuationPurpose.TAXATION, AssetType.COMMERCIAL, DataQuality.GOOD): ValuationMethod.INCOME,
        (ValuationPurpose.TAXATION, AssetType.AGRICULTURAL, DataQuality.FAIR): ValuationMethod.HEDONIC,
        
        (ValuationPurpose.LITIGATION, AssetType.RESIDENTIAL, DataQuality.EXCELLENT): ValuationMethod.MARKET,
        (ValuationPurpose.LITIGATION, AssetType.COMMERCIAL, DataQuality.GOOD): ValuationMethod.INCOME,
        
        (ValuationPurpose.REGULATION, AssetType.RESIDENTIAL, DataQuality.GOOD): ValuationMethod.HEDONIC,
        (ValuationPurpose.REGULATION, AssetType.NATURAL, DataQuality.GOOD): ValuationMethod.NATURAL_CAPITAL,
        (ValuationPurpose.REGULATION, AssetType.AGRICULTURAL, DataQuality.GOOD): ValuationMethod.HEDONIC,
        
        (ValuationPurpose.ENVIRONMENTAL, AssetType.NATURAL, DataQuality.GOOD): ValuationMethod.NATURAL_CAPITAL,
        (ValuationPurpose.ENVIRONMENTAL, AssetType.AGRICULTURAL, DataQuality.GOOD): ValuationMethod.HEDONIC,
    }
    
    # Descripción de métodos
    METHOD_DESCRIPTIONS = {
        ValuationMethod.INCOME: {
            "name": "Enfoque de Ingresos",
            "description": "Valora activos basándose en ingresos futuros generados",
            "best_for": ["Propiedades comerciales", "Inversiones financieras"],
            "requirements": ["Flujos de caja históricos", "Proyecciones de ingresos"],
            "accuracy": "Alta para activos generadores de ingresos"
        },
        ValuationMethod.MARKET: {
            "name": "Enfoque de Mercado",
            "description": "Utiliza precios de transacciones comparables recientes",
            "best_for": ["Propiedades residenciales", "Activos líquidos"],
            "requirements": ["Datos de transacciones recientes", "Activos comparables"],
            "accuracy": "Alta en mercados activos"
        },
        ValuationMethod.ASSET: {
            "name": "Enfoque de Activos",
            "description": "Suma el valor de todos los activos menos pasivos",
            "best_for": ["Empresas", "Carteras de inversión"],
            "requirements": ["Balance contable", "Valuación de activos individuales"],
            "accuracy": "Varía según precisión de valuaciones"
        },
        ValuationMethod.HEDONIC: {
            "name": "Enfoque Hedónico",
            "description": "Estima precios implícitos de atributos mediante econometría espacial",
            "best_for": ["Propiedades residenciales", "Terrenos agrícolas", "Análisis regulatorio"],
            "requirements": ["Datos de transacciones con atributos", "Ubicación geográfica"],
            "accuracy": "Alta en mercados con datos suficientes"
        },
        ValuationMethod.ML: {
            "name": "Machine Learning",
            "description": "Utiliza modelos de aprendizaje automático para predicción de precios",
            "best_for": ["Análisis de grandes volúmenes", "Predicción de tendencias"],
            "requirements": ["Grandes bases de datos", "Poder computacional"],
            "accuracy": "Depende de calidad y cantidad de datos"
        },
        ValuationMethod.NATURAL_CAPITAL: {
            "name": "Capital Natural",
            "description": "Valora servicios ecosistémicos y recursos naturales",
            "best_for": ["Activos ambientales", "Análisis ESG", "Regulación ambiental"],
            "requirements": ["Datos ambientales", "Modelos bioeconómicos"],
            "accuracy": "Media a Alta dependiendo de disponibilidad de datos"
        }
    }
    
    def __init__(self):
        self.results = None
    
    def recommend_valuation_method(
        self,
        purpose: str,
        asset_type: str,
        data_quality: str
    ) -> Dict:
        """
        Recomienda método de valoración basado en contexto.
        
        Args:
            purpose: Propósito (investment, taxation, litigation, regulation, insurance, environmental)
            asset_type: Tipo de activo (residential, commercial, industrial, agricultural, natural, mixed)
            data_quality: Calidad de datos (excellent, good, fair, poor)
            
        Returns:
            Diccionario con recomendación y detalles
        """
        try:
            # Convertir a enums
            purpose_enum = ValuationPurpose(purpose.lower())
            asset_enum = AssetType(asset_type.lower())
            quality_enum = DataQuality(data_quality.lower())
            
            # Buscar recomendación en matriz
            key = (purpose_enum, asset_enum, quality_enum)
            recommended_method = self.RECOMMENDATION_MATRIX.get(key)
            
            # Si no hay coincidencia exacta, usar lógica de fallback
            if not recommended_method:
                recommended_method = self._get_fallback_method(purpose_enum, asset_enum, quality_enum)
            
            # Obtener detalles del método
            method_details = self.METHOD_DESCRIPTIONS.get(
                recommended_method,
                self.METHOD_DESCRIPTIONS[ValuationMethod.MARKET]
            )
            
            # Métodos alternativos
            alternative_methods = self._get_alternative_methods(purpose_enum, asset_enum)
            
            results = {
                "recommended_method": recommended_method.value,
                "method_details": method_details,
                "purpose": purpose,
                "asset_type": asset_type,
                "data_quality": data_quality,
                "confidence_level": self._get_confidence_level(quality_enum),
                "alternative_methods": alternative_methods,
                "datapolis_endpoints": self._get_relevant_endpoints(recommended_method),
                "next_steps": self._get_next_steps(recommended_method)
            }
            
            return results
            
        except ValueError as e:
            logger.error(f"Parámetro inválido: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Error en recomendación: {str(e)}")
            raise
    
    def _get_fallback_method(self, purpose: ValuationPurpose, asset: AssetType, quality: DataQuality) -> ValuationMethod:
        """Retorna método de fallback si no hay coincidencia exacta"""
        # Lógica simple de fallback
        if asset == AssetType.NATURAL:
            return ValuationMethod.NATURAL_CAPITAL
        elif asset == AssetType.COMMERCIAL:
            return ValuationMethod.INCOME
        elif asset == AssetType.RESIDENTIAL:
            return ValuationMethod.MARKET if quality != DataQuality.POOR else ValuationMethod.HEDONIC
        else:
            return ValuationMethod.HEDONIC
    
    def _get_confidence_level(self, quality: DataQuality) -> str:
        """Retorna nivel de confianza basado en calidad de datos"""
        levels = {
            DataQuality.EXCELLENT: "Muy Alta (90-95%)",
            DataQuality.GOOD: "Alta (75-85%)",
            DataQuality.FAIR: "Media (60-75%)",
            DataQuality.POOR: "Baja (<60%)"
        }
        return levels.get(quality, "Media")
    
    def _get_alternative_methods(self, purpose: ValuationPurpose, asset: AssetType) -> List[str]:
        """Retorna métodos alternativos recomendados"""
        alternatives = []
        
        if asset == AssetType.RESIDENTIAL:
            alternatives = ["market", "hedonic", "machine_learning"]
        elif asset == AssetType.COMMERCIAL:
            alternatives = ["income", "market", "asset"]
        elif asset == AssetType.NATURAL:
            alternatives = ["natural_capital", "hedonic"]
        else:
            alternatives = ["market", "income", "hedonic"]
        
        return alternatives
    
    def _get_relevant_endpoints(self, method: ValuationMethod) -> List[str]:
        """Retorna endpoints DATAPOLIS relevantes para el método"""
        endpoints = {
            ValuationMethod.INCOME: ["/api/v1/income-approach/estimate", "/api/v1/cash-flow/project"],
            ValuationMethod.MARKET: ["/api/v1/market/comparables", "/api/v1/market/trends"],
            ValuationMethod.ASSET: ["/api/v1/asset/inventory", "/api/v1/asset/depreciation"],
            ValuationMethod.HEDONIC: ["/api/v1/hedonic/estimate", "/api/v1/hedonic/elasticities"],
            ValuationMethod.ML: ["/api/v1/ml/predict", "/api/v1/ml/train"],
            ValuationMethod.NATURAL_CAPITAL: ["/api/v1/ecosystem/value", "/api/v1/natural-capital/price"]
        }
        return endpoints.get(method, [])
    
    def _get_next_steps(self, method: ValuationMethod) -> List[str]:
        """Retorna pasos siguientes para implementar el método"""
        steps = {
            ValuationMethod.INCOME: [
                "Recopilar flujos de caja históricos",
                "Proyectar ingresos futuros",
                "Determinar tasa de descuento",
                "Calcular valor presente"
            ],
            ValuationMethod.MARKET: [
                "Identificar propiedades comparables",
                "Ajustar por diferencias",
                "Analizar tendencias de mercado",
                "Determinar rango de valor"
            ],
            ValuationMethod.HEDONIC: [
                "Recopilar datos de transacciones",
                "Identificar atributos relevantes",
                "Estimar modelo econométrico",
                "Calcular precios implícitos"
            ],
            ValuationMethod.NATURAL_CAPITAL: [
                "Caracterizar ecosistemas",
                "Obtener datos ambientales",
                "Aplicar modelos de valoración",
                "Calcular valor de servicios"
            ]
        }
        return steps.get(method, [])

# Instancia global
advisor = ValuationAdvisor()
