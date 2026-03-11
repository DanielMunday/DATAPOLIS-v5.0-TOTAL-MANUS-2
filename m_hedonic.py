import numpy as np
import pandas as pd
from typing import Dict, List, Optional, Tuple
from enum import Enum
import logging

logger = logging.getLogger(__name__)

class HedonicModel(str, Enum):
    LINEAR = "linear"
    LOG_LINEAR = "log_linear"
    DOUBLE_LOG = "double_log"
    BOX_COX = "box_cox"

class HedonicPricingEngine:
    """
    Motor de precios hedónicos espaciales.
    Implementa modelos OLS, log-lineal, double-log y Box-Cox.
    Calcula elasticidades, VIF y Moran's I para autocorrelación espacial.
    """
    
    def __init__(self):
        self.model = None
        self.results = None
        self.data = None
        
    def estimate_hedonic_model(
        self,
        prices: List[float],
        features: Dict[str, List[float]],
        model_type: HedonicModel = HedonicModel.LINEAR,
        spatial_weights: Optional[np.ndarray] = None
    ) -> Dict:
        """
        Estima un modelo hedónico.
        
        Args:
            prices: Lista de precios observados
            features: Diccionario con nombres de atributos y sus valores
            model_type: Tipo de modelo (linear, log_linear, double_log, box_cox)
            spatial_weights: Matriz de pesos espaciales para Moran's I
            
        Returns:
            Diccionario con resultados del modelo
        """
        try:
            # Preparar datos
            df = pd.DataFrame(features)
            df['price'] = prices
            
            # Transformar según tipo de modelo
            if model_type == HedonicModel.LOG_LINEAR:
                df['log_price'] = np.log(df['price'])
                y = df['log_price']
            elif model_type == HedonicModel.DOUBLE_LOG:
                df['log_price'] = np.log(df['price'])
                for col in features.keys():
                    df[f'log_{col}'] = np.log(df[col] + 1)
                y = df['log_price']
                X = df[[f'log_{col}' for col in features.keys()]]
            elif model_type == HedonicModel.BOX_COX:
                # Simplificado: usar log como aproximación
                df['log_price'] = np.log(df['price'])
                y = df['log_price']
            else:  # LINEAR
                y = df['price']
            
            # Preparar matriz X
            if model_type != HedonicModel.DOUBLE_LOG:
                X = df[[col for col in features.keys()]]
            
            # Agregar constante
            X = np.column_stack([np.ones(len(X)), X])
            
            # Estimar OLS
            beta = np.linalg.lstsq(X, y, rcond=None)[0]
            
            # Residuos
            y_pred = X @ beta
            residuals = y - y_pred
            
            # Estadísticas
            n = len(y)
            k = X.shape[1]
            sse = np.sum(residuals**2)
            mse = sse / (n - k)
            r_squared = 1 - (sse / np.sum((y - np.mean(y))**2))
            
            # Errores estándar
            var_covar = mse * np.linalg.inv(X.T @ X)
            se = np.sqrt(np.diag(var_covar))
            t_stats = beta / se
            
            # VIF (Variance Inflation Factor)
            vif = self._calculate_vif(X[:, 1:])
            
            # Moran's I si se proporcionan pesos espaciales
            morans_i = None
            if spatial_weights is not None:
                morans_i = self._calculate_morans_i(residuals, spatial_weights)
            
            # Elasticidades
            elasticities = self._calculate_elasticities(beta, df, model_type)
            
            # Precios implícitos
            implicit_prices = beta[1:]
            
            results = {
                "model_type": model_type.value,
                "coefficients": beta.tolist(),
                "standard_errors": se.tolist(),
                "t_statistics": t_stats.tolist(),
                "r_squared": float(r_squared),
                "mse": float(mse),
                "n_observations": n,
                "n_variables": k,
                "vif": vif,
                "morans_i": morans_i,
                "elasticities": elasticities,
                "implicit_prices": implicit_prices.tolist(),
                "residuals": residuals.tolist()
            }
            
            return results
            
        except Exception as e:
            logger.error(f"Error en estimación hedónica: {str(e)}")
            raise
    
    def _calculate_vif(self, X: np.ndarray) -> List[float]:
        """Calcula VIF para cada variable"""
        vif_values = []
        for i in range(X.shape[1]):
            X_i = np.delete(X, i, axis=1)
            X_i = np.column_stack([np.ones(len(X_i)), X_i])
            r_squared_i = 1 - (np.sum((X[:, i] - X_i @ np.linalg.lstsq(X_i, X[:, i], rcond=None)[0])**2) / 
                               np.sum((X[:, i] - np.mean(X[:, i]))**2))
            vif = 1 / (1 - r_squared_i) if r_squared_i < 1 else float('inf')
            vif_values.append(float(vif))
        return vif_values
    
    def _calculate_morans_i(self, residuals: np.ndarray, W: np.ndarray) -> float:
        """Calcula Moran's I para autocorrelación espacial"""
        n = len(residuals)
        e = residuals - np.mean(residuals)
        We = W @ e
        numerator = (e @ We) / (n)
        denominator = (e @ e) / n
        morans_i = numerator / denominator if denominator != 0 else 0
        return float(morans_i)
    
    def _calculate_elasticities(self, beta: np.ndarray, df: pd.DataFrame, model_type: HedonicModel) -> Dict:
        """Calcula elasticidades según tipo de modelo"""
        elasticities = {}
        
        if model_type == HedonicModel.DOUBLE_LOG:
            # En modelo double-log, los coeficientes son elasticidades
            for i, col in enumerate(df.columns[:-1]):
                elasticities[col] = float(beta[i+1])
        else:
            # En modelo lineal, elasticidad = (beta * media_x) / media_y
            mean_price = df['price'].mean()
            for i, col in enumerate(df.columns[:-1]):
                if col != 'log_price':
                    mean_x = df[col].mean()
                    elasticity = (beta[i+1] * mean_x) / mean_price
                    elasticities[col] = float(elasticity)
        
        return elasticities

# Instancia global
hedonic_engine = HedonicPricingEngine()
