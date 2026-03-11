'''
Precession ML Engine for territorial transformation predictions.
'''

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from prophet import Prophet
import xgboost as xgb

class PrecessionMLEngine:
    '''
    Predicts territorial transformations using a combination of ML models.
    '''

    def __init__(self):
        self.rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.prophet_model = Prophet()
        self.xgb_model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100)

    def predict_transformations(self, historical_data: pd.DataFrame, future_periods: int) -> dict:
        '''
        Predicts territorial transformations for a given number of future periods.

        Args:
            historical_data: A pandas DataFrame with the historical data. 
                             It must contain 'ds' (datestamp) and 'y' (numeric value) columns for Prophet, 
                             and other feature columns for RF and XGBoost.
            future_periods: The number of future periods to predict (in years).

        Returns:
            A dictionary with the predictions for 5, 10, and 20 years.
        '''
        if 'ds' not in historical_data.columns or 'y' not in historical_data.columns:
            raise ValueError("Historical data must contain 'ds' and 'y' columns for Prophet model.")

        # Train-test split
        features = [col for col in historical_data.columns if col not in ['ds', 'y']]
        X = historical_data[features]
        y = historical_data['y']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train models
        self.rf_model.fit(X_train, y_train)
        self.prophet_model.fit(historical_data[['ds', 'y']])
        self.xgb_model.fit(X_train, y_train)

        # Create future dataframe for Prophet
        future_df = self.prophet_model.make_future_dataframe(periods=future_periods * 365)

        # Generate predictions
        prophet_forecast = self.prophet_model.predict(future_df)

        # For RF and XGBoost, we need future features. We can propagate the last known features or use a more sophisticated method.
        # For simplicity, we'll use the last known features for prediction.
        last_features = X.iloc[-1:].values
        rf_preds = self.rf_model.predict(last_features)
        xgb_preds = self.xgb_model.predict(last_features)

        # Combine predictions (e.g., simple average)
        # A more complex ensemble method could be used here.
        combined_pred = (prophet_forecast['yhat'].iloc[-1] + rf_preds[0] + xgb_preds[0]) / 3

        # For multi-year predictions, this logic would need to be extended to generate features for future years.
        # This is a simplified example.
        predictions = {
            "prediction_5_years": combined_pred * 1.05, # Simplistic growth projection
            "prediction_10_years": combined_pred * 1.10,
            "prediction_20_years": combined_pred * 1.20,
        }

        return predictions
