"""
DATAPOLIS v5.0 - Test Suite para Kernel Precesional
Pruebas unitarias e integración
"""

import pytest
import numpy as np
import json
from datetime import datetime
import sys
import os

# Agregar ruta del backend
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../backend'))

from kernel_precesional import (
    PrecessionKernel, Location, PropertyData, PrecessionScore,
    AngleType, RadiusType
)


class TestLocation:
    """Tests para la clase Location"""

    def test_distance_calculation(self):
        """Probar cálculo de distancia Haversine"""
        loc1 = Location(-33.4489, -70.6693)  # Santiago
        loc2 = Location(-33.4489, -70.6693)  # Mismo punto

        distance = loc1.distance_to(loc2)
        assert distance < 1  # Debe ser casi cero

    def test_bearing_calculation(self):
        """Probar cálculo de ángulo (bearing)"""
        loc1 = Location(-33.4489, -70.6693)
        loc2 = Location(-33.4489, -70.5693)  # Al este

        bearing = loc1.bearing_to(loc2)
        assert 80 < bearing < 100  # Debe estar cerca de 90 (este)

    def test_distance_santiago_to_valparaiso(self):
        """Probar distancia real Santiago-Valparaíso"""
        santiago = Location(-33.4489, -70.6693)
        valparaiso = Location(-33.0472, -71.6127)

        distance = santiago.distance_to(valparaiso)
        # Distancia real es aproximadamente 120 km
        assert 110000 < distance < 130000


class TestPrecessionKernel:
    """Tests para el Kernel Precesional"""

    @pytest.fixture
    def kernel(self):
        """Crear instancia del kernel"""
        return PrecessionKernel()

    @pytest.fixture
    def sample_property(self):
        """Crear propiedad de ejemplo"""
        return PropertyData(
            id="TEST_001",
            location=Location(-33.4489, -70.6693),
            area_sqm=200,
            use_type="residential",
            age_years=10,
            condition="good",
            value_per_sqm=5000,
            neighborhood="Las Condes",
            municipality="Las Condes",
            region="RM",
            has_parking=True,
            has_garden=False,
            proximity_to_metro=300,
            proximity_to_schools=500,
            proximity_to_parks=800
        )

    @pytest.fixture
    def sample_context(self):
        """Crear contexto de vecindario de ejemplo"""
        return {
            'crime_rate': 0.02,
            'default_rate': 0.03,
            'flood_risk': 0.0,
            'earthquake_risk': 0.5,
            'price_volatility': 0.08,
            'regulatory_risk': 0.0,
            'expected_growth': 0.05,
            'infrastructure_projects': 2,
            'favorable_zoning_changes': 1,
            'market_demand': 0.7,
            'population_density': 6000
        }

    def test_kernel_initialization(self, kernel):
        """Probar inicialización del kernel"""
        assert kernel is not None
        assert len(kernel.angles) == 5  # 5 ángulos
        assert len(kernel.radii) == 5   # 5 radios

    def test_calculate_precession_zones(self, kernel, sample_property):
        """Probar cálculo de zonas precesionales"""
        zones = kernel.calculate_precession_zones(sample_property.location)

        assert len(zones) == 25  # 5 ángulos × 5 radios
        assert all(zone_id.startswith('zone_') for zone_id in zones.keys())

    def test_calculate_precession_score(self, kernel, sample_property, sample_context):
        """Probar cálculo de score precesional"""
        score = kernel.calculate_precession_score(sample_property, sample_context)

        assert isinstance(score, PrecessionScore)
        assert 0 <= score.precession_score <= 100
        assert 0 <= score.opportunity_score <= 100
        assert 0 <= score.risk_score <= 100
        assert 0 <= score.confidence_score <= 100
        assert 0.5 <= score.precession_multiplier <= 2.0

    def test_score_consistency(self, kernel, sample_property, sample_context):
        """Probar consistencia de scores"""
        score1 = kernel.calculate_precession_score(sample_property, sample_context)
        score2 = kernel.calculate_precession_score(sample_property, sample_context)

        assert score1.precession_score == score2.precession_score
        assert score1.multiplier == score2.multiplier

    def test_location_score_calculation(self, kernel):
        """Probar cálculo de score de ubicación"""
        # Ubicación en Santiago
        location_santiago = Location(-33.4489, -70.6693)
        score_santiago = kernel._calculate_location_score(location_santiago)

        # Ubicación lejana
        location_far = Location(-40.0, -75.0)
        score_far = kernel._calculate_location_score(location_far)

        assert score_santiago > score_far

    def test_property_score_calculation(self, kernel, sample_property):
        """Probar cálculo de score de propiedad"""
        score = kernel._calculate_property_score(sample_property)

        assert 20 <= score <= 100
        assert isinstance(score, float)

    def test_context_score_calculation(self, kernel, sample_context):
        """Probar cálculo de score de contexto"""
        score = kernel._calculate_context_score(sample_context)

        assert 20 <= score <= 100
        assert isinstance(score, float)

    def test_risk_score_calculation(self, kernel, sample_property, sample_context):
        """Probar cálculo de score de riesgo"""
        score = kernel._calculate_risk_score(sample_property, sample_context)

        assert 0 <= score <= 100
        assert isinstance(score, float)

    def test_opportunity_score_calculation(self, kernel, sample_property, sample_context):
        """Probar cálculo de score de oportunidad"""
        score = kernel._calculate_opportunity_score(sample_property, sample_context)

        assert 10 <= score <= 100
        assert isinstance(score, float)

    def test_multiplier_calculation(self, kernel):
        """Probar cálculo de multiplicador precesional"""
        # Caso optimista
        mult_high = kernel._calculate_multiplier(80, 80, 20)
        assert mult_high > 1.0

        # Caso pesimista
        mult_low = kernel._calculate_multiplier(30, 20, 80)
        assert mult_low < 1.0

        # Caso neutral
        mult_neutral = kernel._calculate_multiplier(50, 50, 50)
        assert 0.9 < mult_neutral < 1.1

    def test_confidence_score_calculation(self, kernel, sample_property, sample_context):
        """Probar cálculo de score de confianza"""
        score = kernel._calculate_confidence_score(sample_property, sample_context)

        assert 0 <= score <= 100
        assert isinstance(score, float)

    def test_generate_narrative(self, kernel, sample_property):
        """Probar generación de narrativa"""
        scores = PrecessionScore(
            precession_score=75,
            opportunity_score=70,
            risk_score=30,
            confidence_score=85,
            precession_multiplier=1.3
        )

        narrative = kernel.generate_narrative(sample_property, scores)

        assert isinstance(narrative, str)
        assert len(narrative) > 100
        assert "ANÁLISIS PRECESIONAL" in narrative
        assert "75.0" in narrative

    def test_analyze_property_complete(self, kernel, sample_property, sample_context):
        """Probar análisis completo de propiedad"""
        result = kernel.analyze_property(sample_property, sample_context)

        assert 'property_id' in result
        assert 'location' in result
        assert 'scores' in result
        assert 'zones' in result
        assert 'narrative' in result
        assert 'timestamp' in result

        assert result['property_id'] == "TEST_001"
        assert len(result['zones']) == 25

    def test_analyze_property_json_serializable(self, kernel, sample_property, sample_context):
        """Probar que resultado es serializable a JSON"""
        result = kernel.analyze_property(sample_property, sample_context)

        try:
            json_str = json.dumps(result)
            parsed = json.loads(json_str)
            assert parsed['property_id'] == "TEST_001"
        except Exception as e:
            pytest.fail(f"Result not JSON serializable: {e}")


class TestPrecessionZones:
    """Tests para zonas precesionales"""

    def test_zone_contains_point(self):
        """Probar si punto está dentro de zona"""
        from kernel_precesional import PrecessionZone

        center = Location(-33.4489, -70.6693)
        zone = PrecessionZone(angle=0, radius=1000, center=center)

        # Punto dentro de la zona
        point_inside = Location(-33.4389, -70.6693)  # 1 km al norte
        assert zone.contains_point(point_inside)

        # Punto fuera de la zona
        point_outside = Location(-33.4289, -70.6693)  # 2 km al norte
        assert not zone.contains_point(point_outside)


class TestIntegration:
    """Tests de integración"""

    def test_full_pipeline(self):
        """Probar pipeline completo de análisis"""
        kernel = PrecessionKernel()

        # Crear múltiples propiedades
        properties = [
            PropertyData(
                id=f"PROP_{i:03d}",
                location=Location(-33.4489 + i*0.001, -70.6693 + i*0.001),
                area_sqm=200 + i*10,
                use_type="residential",
                age_years=10 + i,
                condition="good",
                value_per_sqm=5000 + i*100,
                neighborhood=f"Neighborhood_{i}",
                municipality="Santiago",
                region="RM"
            )
            for i in range(5)
        ]

        context = {
            'crime_rate': 0.02,
            'default_rate': 0.03,
            'expected_growth': 0.05,
            'market_demand': 0.7
        }

        results = []
        for prop in properties:
            result = kernel.analyze_property(prop, context)
            results.append(result)

        assert len(results) == 5
        assert all('scores' in r for r in results)

    def test_performance(self):
        """Probar performance del kernel"""
        import time

        kernel = PrecessionKernel()
        property_data = PropertyData(
            id="PERF_TEST",
            location=Location(-33.4489, -70.6693),
            area_sqm=200,
            use_type="residential",
            age_years=10,
            condition="good",
            value_per_sqm=5000,
            neighborhood="Test",
            municipality="Santiago",
            region="RM"
        )

        context = {'crime_rate': 0.02, 'default_rate': 0.03}

        start = time.time()
        for _ in range(100):
            kernel.analyze_property(property_data, context)
        elapsed = time.time() - start

        # Debe procesar 100 análisis en menos de 5 segundos
        assert elapsed < 5.0
        print(f"Performance: 100 analyses in {elapsed:.2f}s ({100/elapsed:.0f} analyses/sec)")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
