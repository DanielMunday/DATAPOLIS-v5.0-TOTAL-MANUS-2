import pytest
from app.services.m_hedonic import hedonic_engine, HedonicModel

def test_linear_hedonic_model():
    """Test estimación de modelo hedónico lineal"""
    prices = [300000, 350000, 400000, 450000, 500000]
    features = {
        "area_sqm": [100, 120, 150, 180, 200],
        "bedrooms": [2, 3, 3, 4, 4],
        "distance_center_km": [5, 3, 2, 1, 0.5]
    }
    
    results = hedonic_engine.estimate_hedonic_model(
        prices=prices,
        features=features,
        model_type=HedonicModel.LINEAR
    )
    
    assert results is not None
    assert "coefficients" in results
    assert "r_squared" in results
    assert results["r_squared"] > 0
    assert results["r_squared"] <= 1

def test_log_linear_hedonic_model():
    """Test estimación de modelo hedónico log-lineal"""
    prices = [300000, 350000, 400000, 450000, 500000]
    features = {
        "area_sqm": [100, 120, 150, 180, 200],
        "bedrooms": [2, 3, 3, 4, 4]
    }
    
    results = hedonic_engine.estimate_hedonic_model(
        prices=prices,
        features=features,
        model_type=HedonicModel.LOG_LINEAR
    )
    
    assert results["model_type"] == "log_linear"
    assert "elasticities" in results

def test_vif_calculation():
    """Test cálculo de VIF"""
    prices = [300000, 350000, 400000, 450000, 500000]
    features = {
        "area_sqm": [100, 120, 150, 180, 200],
        "bedrooms": [2, 3, 3, 4, 4],
        "distance_center_km": [5, 3, 2, 1, 0.5]
    }
    
    results = hedonic_engine.estimate_hedonic_model(
        prices=prices,
        features=features,
        model_type=HedonicModel.LINEAR
    )
    
    assert "vif" in results
    assert len(results["vif"]) == len(features)
    assert all(vif > 0 for vif in results["vif"])

def test_elasticities():
    """Test cálculo de elasticidades"""
    prices = [300000, 350000, 400000, 450000, 500000]
    features = {
        "area_sqm": [100, 120, 150, 180, 200],
        "bedrooms": [2, 3, 3, 4, 4]
    }
    
    results = hedonic_engine.estimate_hedonic_model(
        prices=prices,
        features=features,
        model_type=HedonicModel.DOUBLE_LOG
    )
    
    assert "elasticities" in results
    assert "area_sqm" in results["elasticities"]
    assert "bedrooms" in results["elasticities"]

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
