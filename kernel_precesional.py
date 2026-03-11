"""
DATAPOLIS v5.0 - Kernel Precesional (M09)
Motor central de análisis territorial precesional
Implementación completa con cálculo de ángulos, radios, scores y narrativas IA
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from enum import Enum
import math
from datetime import datetime
import json


class AngleType(Enum):
    """Ángulos precesionales definidos"""
    NORTH = 0
    NORTHEAST = 45
    EAST = 90
    SOUTHEAST = 135
    SOUTH = 180


class RadiusType(Enum):
    """Radios precesionales definidos (en metros)"""
    IMMEDIATE = 300
    NEAR = 500
    MEDIUM = 1000
    FAR = 2000
    EXTENDED = 5000


@dataclass
class Location:
    """Ubicación geográfica"""
    latitude: float
    longitude: float
    
    def distance_to(self, other: 'Location') -> float:
        """Calcular distancia Haversine a otra ubicación"""
        R = 6371000  # Radio de la Tierra en metros
        
        lat1 = math.radians(self.latitude)
        lat2 = math.radians(other.latitude)
        delta_lat = math.radians(other.latitude - self.latitude)
        delta_lon = math.radians(other.longitude - self.longitude)
        
        a = math.sin(delta_lat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(delta_lon/2)**2
        c = 2 * math.asin(math.sqrt(a))
        
        return R * c
    
    def bearing_to(self, other: 'Location') -> float:
        """Calcular ángulo (bearing) a otra ubicación"""
        lat1 = math.radians(self.latitude)
        lat2 = math.radians(other.latitude)
        delta_lon = math.radians(other.longitude - self.longitude)
        
        x = math.sin(delta_lon) * math.cos(lat2)
        y = math.cos(lat1) * math.sin(lat2) - math.sin(lat1) * math.cos(lat2) * math.cos(delta_lon)
        
        bearing = math.atan2(x, y)
        bearing = math.degrees(bearing)
        bearing = (bearing + 360) % 360
        
        return bearing


@dataclass
class PrecessionZone:
    """Zona precesional definida por ángulo y radio"""
    angle: float
    radius: float
    center: Location
    
    def contains_point(self, point: Location, tolerance: float = 10) -> bool:
        """Verificar si un punto está dentro de la zona precesional"""
        distance = self.center.distance_to(point)
        bearing = self.center.bearing_to(point)
        
        # Verificar distancia
        if distance > self.radius + tolerance:
            return False
        
        # Verificar ángulo (±22.5 grados de tolerancia)
        angle_diff = abs(bearing - self.angle)
        if angle_diff > 180:
            angle_diff = 360 - angle_diff
        
        return angle_diff <= 22.5


@dataclass
class PropertyData:
    """Datos de propiedad para análisis"""
    id: str
    location: Location
    area_sqm: float
    use_type: str
    age_years: int
    condition: str
    value_per_sqm: float
    neighborhood: str
    municipality: str
    region: str
    
    # Características adicionales
    has_parking: bool = True
    has_garden: bool = False
    proximity_to_metro: float = 0  # metros
    proximity_to_schools: float = 0
    proximity_to_parks: float = 0


@dataclass
class PrecessionScore:
    """Scores precesionales calculados"""
    precession_score: float  # 0-100
    opportunity_score: float  # 0-100
    risk_score: float  # 0-100
    confidence_score: float  # 0-100
    precession_multiplier: float  # 0.5-2.0
    
    def to_dict(self) -> Dict:
        return {
            'precession_score': round(self.precession_score, 2),
            'opportunity_score': round(self.opportunity_score, 2),
            'risk_score': round(self.risk_score, 2),
            'confidence_score': round(self.confidence_score, 2),
            'precession_multiplier': round(self.precession_multiplier, 3)
        }


class PrecessionKernel:
    """
    Kernel central del motor precesional
    Calcula ángulos, radios, scores y narrativas
    """
    
    def __init__(self):
        self.angles = [angle.value for angle in AngleType]
        self.radii = [radius.value for radius in RadiusType]
        self.properties_db = {}
        self.analysis_cache = {}
    
    def calculate_precession_zones(self, center: Location) -> Dict[str, PrecessionZone]:
        """Calcular todas las zonas precesionales para una ubicación"""
        zones = {}
        
        for angle in self.angles:
            for radius in self.radii:
                zone_id = f"zone_{angle}_{radius}"
                zones[zone_id] = PrecessionZone(
                    angle=angle,
                    radius=radius,
                    center=center
                )
        
        return zones
    
    def calculate_precession_score(self, property_data: PropertyData, 
                                   neighborhood_context: Dict) -> PrecessionScore:
        """
        Calcular score precesional basado en:
        - Ubicación y ángulos/radios
        - Características de propiedad
        - Contexto de vecindario
        - Indicadores ambientales
        """
        
        # 1. Score de ubicación (basado en ángulos/radios)
        location_score = self._calculate_location_score(property_data.location)
        
        # 2. Score de propiedad (características intrínsecas)
        property_score = self._calculate_property_score(property_data)
        
        # 3. Score de contexto (vecindario, accesibilidad, servicios)
        context_score = self._calculate_context_score(neighborhood_context)
        
        # 4. Score de riesgo (morosidad, volatilidad, ambiental)
        risk_score = self._calculate_risk_score(property_data, neighborhood_context)
        
        # 5. Score de oportunidad (potencial de apreciación, desarrollo)
        opportunity_score = self._calculate_opportunity_score(property_data, neighborhood_context)
        
        # Consolidar scores
        precession_score = (location_score * 0.25 + 
                           property_score * 0.25 + 
                           context_score * 0.25 + 
                           opportunity_score * 0.25)
        
        # Calcular multiplicador precesional (0.5-2.0)
        precession_multiplier = self._calculate_multiplier(
            precession_score, 
            opportunity_score, 
            risk_score
        )
        
        # Score de confianza (basado en cantidad de datos disponibles)
        confidence_score = self._calculate_confidence_score(property_data, neighborhood_context)
        
        return PrecessionScore(
            precession_score=precession_score,
            opportunity_score=opportunity_score,
            risk_score=risk_score,
            confidence_score=confidence_score,
            precession_multiplier=precession_multiplier
        )
    
    def _calculate_location_score(self, location: Location) -> float:
        """Score basado en ubicación geográfica"""
        # Normalizar coordenadas a Santiago (RM)
        santiago_center = Location(-33.4489, -70.6693)
        distance = location.distance_to(santiago_center)
        
        # Penalizar distancia (máximo 50km)
        if distance > 50000:
            return 20
        
        location_score = 100 * (1 - (distance / 50000))
        return max(20, location_score)
    
    def _calculate_property_score(self, property_data: PropertyData) -> float:
        """Score basado en características de propiedad"""
        score = 50
        
        # Ajustar por tipo de uso
        use_type_weights = {
            'residential': 1.0,
            'commercial': 0.8,
            'industrial': 0.6,
            'mixed': 0.9
        }
        score *= use_type_weights.get(property_data.use_type, 0.7)
        
        # Ajustar por edad
        if property_data.age_years < 5:
            score += 15
        elif property_data.age_years < 15:
            score += 10
        elif property_data.age_years > 50:
            score -= 10
        
        # Ajustar por condición
        condition_weights = {
            'excellent': 1.15,
            'good': 1.0,
            'fair': 0.85,
            'poor': 0.6
        }
        score *= condition_weights.get(property_data.condition, 0.8)
        
        # Ajustar por amenidades
        if property_data.has_parking:
            score += 5
        if property_data.has_garden:
            score += 5
        
        return min(100, max(20, score))
    
    def _calculate_context_score(self, neighborhood_context: Dict) -> float:
        """Score basado en contexto de vecindario"""
        score = 50
        
        # Accesibilidad a transporte
        if neighborhood_context.get('proximity_to_metro', 0) < 500:
            score += 20
        elif neighborhood_context.get('proximity_to_metro', 0) < 1000:
            score += 10
        
        # Accesibilidad a servicios
        if neighborhood_context.get('proximity_to_schools', 0) < 1000:
            score += 10
        if neighborhood_context.get('proximity_to_parks', 0) < 500:
            score += 10
        
        # Seguridad (tasa de criminalidad)
        crime_rate = neighborhood_context.get('crime_rate', 50)
        score -= (crime_rate - 50) * 0.2
        
        # Densidad de población
        density = neighborhood_context.get('population_density', 5000)
        if 3000 < density < 8000:
            score += 10
        
        return min(100, max(20, score))
    
    def _calculate_risk_score(self, property_data: PropertyData, 
                             neighborhood_context: Dict) -> float:
        """Score de riesgo (0-100, donde 100 es máximo riesgo)"""
        risk = 30  # Riesgo base
        
        # Riesgo de morosidad (por municipio)
        default_rate = neighborhood_context.get('default_rate', 0.05)
        risk += default_rate * 100
        
        # Riesgo ambiental
        flood_risk = neighborhood_context.get('flood_risk', 0)
        earthquake_risk = neighborhood_context.get('earthquake_risk', 0)
        risk += flood_risk * 20 + earthquake_risk * 15
        
        # Riesgo de volatilidad de precios
        price_volatility = neighborhood_context.get('price_volatility', 0.1)
        risk += price_volatility * 50
        
        # Riesgo normativo (cambios de zonificación)
        regulatory_risk = neighborhood_context.get('regulatory_risk', 0)
        risk += regulatory_risk * 30
        
        return min(100, max(0, risk))
    
    def _calculate_opportunity_score(self, property_data: PropertyData, 
                                    neighborhood_context: Dict) -> float:
        """Score de oportunidad (potencial de apreciación)"""
        opportunity = 40
        
        # Crecimiento esperado del barrio
        expected_growth = neighborhood_context.get('expected_growth', 0.03)
        opportunity += expected_growth * 100
        
        # Proyectos de infraestructura cercanos
        infrastructure_projects = neighborhood_context.get('infrastructure_projects', 0)
        opportunity += infrastructure_projects * 5
        
        # Cambios de zonificación favorables
        zoning_changes = neighborhood_context.get('favorable_zoning_changes', 0)
        opportunity += zoning_changes * 10
        
        # Demanda de mercado
        market_demand = neighborhood_context.get('market_demand', 0.5)
        opportunity += market_demand * 30
        
        return min(100, max(10, opportunity))
    
    def _calculate_multiplier(self, precession_score: float, 
                             opportunity_score: float, 
                             risk_score: float) -> float:
        """Calcular multiplicador precesional (0.5-2.0)"""
        # Base: 1.0
        multiplier = 1.0
        
        # Ajustar por oportunidad
        multiplier += (opportunity_score - 50) * 0.01
        
        # Ajustar por riesgo
        multiplier -= (risk_score - 30) * 0.01
        
        # Limitar a rango 0.5-2.0
        return max(0.5, min(2.0, multiplier))
    
    def _calculate_confidence_score(self, property_data: PropertyData, 
                                   neighborhood_context: Dict) -> float:
        """Calcular score de confianza en el análisis"""
        confidence = 50
        
        # Datos de propiedad disponibles
        if property_data.area_sqm > 0:
            confidence += 10
        if property_data.age_years >= 0:
            confidence += 10
        if property_data.value_per_sqm > 0:
            confidence += 10
        
        # Datos de contexto disponibles
        if 'crime_rate' in neighborhood_context:
            confidence += 5
        if 'default_rate' in neighborhood_context:
            confidence += 5
        if 'expected_growth' in neighborhood_context:
            confidence += 5
        if 'market_demand' in neighborhood_context:
            confidence += 5
        
        return min(100, confidence)
    
    def generate_narrative(self, property_data: PropertyData, 
                          scores: PrecessionScore) -> str:
        """Generar narrativa cualitativa del análisis"""
        narrative = f"""
ANÁLISIS PRECESIONAL - {property_data.id}
Ubicación: {property_data.neighborhood}, {property_data.municipality}
Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

RESUMEN EJECUTIVO:
La propiedad ubicada en {property_data.neighborhood} presenta un score precesional de {scores.precession_score:.1f}/100, 
indicando un {"ALTO" if scores.precession_score > 70 else "MODERADO" if scores.precession_score > 50 else "BAJO"} potencial de inversión.

ANÁLISIS DE SCORES:
- Score Precesional: {scores.precession_score:.1f}/100
- Score de Oportunidad: {scores.opportunity_score:.1f}/100
- Score de Riesgo: {scores.risk_score:.1f}/100
- Score de Confianza: {scores.confidence_score:.1f}/100
- Multiplicador Precesional: {scores.precession_multiplier:.2f}x

INTERPRETACIÓN:
"""
        
        # Agregar interpretación basada en scores
        if scores.precession_score > 70:
            narrative += "La propiedad se encuentra en una zona de alto potencial precesional. "
        elif scores.precession_score > 50:
            narrative += "La propiedad se encuentra en una zona de potencial moderado. "
        else:
            narrative += "La propiedad se encuentra en una zona de bajo potencial precesional. "
        
        if scores.opportunity_score > 60:
            narrative += "Existe un alto potencial de apreciación en los próximos años. "
        
        if scores.risk_score < 40:
            narrative += "El perfil de riesgo es bajo a moderado. "
        elif scores.risk_score > 60:
            narrative += "Existen riesgos significativos que deben considerarse. "
        
        narrative += f"\nEl multiplicador precesional de {scores.precession_multiplier:.2f}x sugiere que "
        if scores.precession_multiplier > 1.2:
            narrative += "la propiedad tiene un potencial de retorno superior al promedio del mercado."
        elif scores.precession_multiplier < 0.8:
            narrative += "la propiedad tiene un potencial de retorno inferior al promedio del mercado."
        else:
            narrative += "la propiedad tiene un potencial de retorno alineado con el promedio del mercado."
        
        return narrative
    
    def analyze_property(self, property_data: PropertyData, 
                        neighborhood_context: Dict) -> Dict:
        """Análisis completo de propiedad"""
        
        # Calcular zonas precesionales
        zones = self.calculate_precession_zones(property_data.location)
        
        # Calcular scores
        scores = self.calculate_precession_score(property_data, neighborhood_context)
        
        # Generar narrativa
        narrative = self.generate_narrative(property_data, scores)
        
        # Compilar resultado
        return {
            'property_id': property_data.id,
            'location': {
                'latitude': property_data.location.latitude,
                'longitude': property_data.location.longitude,
                'neighborhood': property_data.neighborhood,
                'municipality': property_data.municipality
            },
            'scores': scores.to_dict(),
            'zones': {k: {'angle': v.angle, 'radius': v.radius} for k, v in zones.items()},
            'narrative': narrative,
            'timestamp': datetime.now().isoformat()
        }


# Ejemplo de uso
if __name__ == "__main__":
    # Crear kernel
    kernel = PrecessionKernel()
    
    # Crear propiedad de ejemplo
    property_data = PropertyData(
        id="PROP_001",
        location=Location(-33.4489, -70.6693),  # Santiago
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
    
    # Contexto de vecindario
    neighborhood_context = {
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
    
    # Analizar
    result = kernel.analyze_property(property_data, neighborhood_context)
    
    # Mostrar resultado
    print(json.dumps(result, indent=2, ensure_ascii=False))
