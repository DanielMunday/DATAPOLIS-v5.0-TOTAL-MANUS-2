"""
DATAPOLIS v5.0 - Pilot Case: Santiago Metropolitan Area
Caso de prueba con datos reales de propiedades en Santiago
"""

import json
import sys
import os
from datetime import datetime

# Agregar ruta del backend
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../backend'))

from kernel_precesional import PrecessionKernel, Location, PropertyData


class SantiagoPilot:
    """Caso piloto de análisis para Santiago"""

    def __init__(self):
        self.kernel = PrecessionKernel()
        self.results = []

    def get_sample_properties(self):
        """Obtener propiedades de ejemplo en Santiago"""
        return [
            PropertyData(
                id="STGO_LAS_CONDES_001",
                location=Location(-33.4489, -70.6693),
                area_sqm=250,
                use_type="residential",
                age_years=5,
                condition="excellent",
                value_per_sqm=8500,
                neighborhood="Las Condes",
                municipality="Las Condes",
                region="RM",
                has_parking=True,
                has_garden=True,
                proximity_to_metro=400,
                proximity_to_schools=300,
                proximity_to_parks=500
            ),
            PropertyData(
                id="STGO_VITACURA_001",
                location=Location(-33.3928, -70.5928),
                area_sqm=300,
                use_type="residential",
                age_years=8,
                condition="good",
                value_per_sqm=7200,
                neighborhood="Vitacura",
                municipality="Vitacura",
                region="RM",
                has_parking=True,
                has_garden=True,
                proximity_to_metro=600,
                proximity_to_schools=400,
                proximity_to_parks=300
            ),
            PropertyData(
                id="STGO_PROVIDENCIA_001",
                location=Location(-33.4328, -70.6028),
                area_sqm=180,
                use_type="residential",
                age_years=15,
                condition="good",
                value_per_sqm=6800,
                neighborhood="Providencia",
                municipality="Providencia",
                region="RM",
                has_parking=True,
                has_garden=False,
                proximity_to_metro=200,
                proximity_to_schools=250,
                proximity_to_parks=400
            ),
            PropertyData(
                id="STGO_ÑUÑOA_001",
                location=Location(-33.4428, -70.5928),
                area_sqm=200,
                use_type="residential",
                age_years=20,
                condition="fair",
                value_per_sqm=5200,
                neighborhood="Ñuñoa",
                municipality="Ñuñoa",
                region="RM",
                has_parking=True,
                has_garden=False,
                proximity_to_metro=300,
                proximity_to_schools=200,
                proximity_to_parks=600
            ),
            PropertyData(
                id="STGO_MACUL_001",
                location=Location(-33.4628, -70.5628),
                area_sqm=150,
                use_type="residential",
                age_years=30,
                condition="fair",
                value_per_sqm=3800,
                neighborhood="Macul",
                municipality="Macul",
                region="RM",
                has_parking=False,
                has_garden=False,
                proximity_to_metro=800,
                proximity_to_schools=500,
                proximity_to_parks=1000
            ),
            PropertyData(
                id="STGO_COMMERCIAL_001",
                location=Location(-33.4389, -70.6393),
                area_sqm=500,
                use_type="commercial",
                age_years=10,
                condition="good",
                value_per_sqm=4500,
                neighborhood="Centro",
                municipality="Santiago",
                region="RM",
                has_parking=True,
                has_garden=False,
                proximity_to_metro=100,
                proximity_to_schools=0,
                proximity_to_parks=200
            )
        ]

    def get_neighborhood_contexts(self):
        """Obtener contextos de vecindarios"""
        return {
            "Las Condes": {
                'crime_rate': 0.015,
                'default_rate': 0.02,
                'flood_risk': 0.0,
                'earthquake_risk': 0.5,
                'price_volatility': 0.06,
                'regulatory_risk': 0.0,
                'expected_growth': 0.08,
                'infrastructure_projects': 5,
                'favorable_zoning_changes': 2,
                'market_demand': 0.9,
                'population_density': 8000
            },
            "Vitacura": {
                'crime_rate': 0.012,
                'default_rate': 0.018,
                'flood_risk': 0.0,
                'earthquake_risk': 0.5,
                'price_volatility': 0.05,
                'regulatory_risk': 0.0,
                'expected_growth': 0.07,
                'infrastructure_projects': 3,
                'favorable_zoning_changes': 1,
                'market_demand': 0.85,
                'population_density': 7500
            },
            "Providencia": {
                'crime_rate': 0.02,
                'default_rate': 0.025,
                'flood_risk': 0.0,
                'earthquake_risk': 0.5,
                'price_volatility': 0.07,
                'regulatory_risk': 0.05,
                'expected_growth': 0.05,
                'infrastructure_projects': 2,
                'favorable_zoning_changes': 0,
                'market_demand': 0.75,
                'population_density': 9000
            },
            "Ñuñoa": {
                'crime_rate': 0.03,
                'default_rate': 0.035,
                'flood_risk': 0.05,
                'earthquake_risk': 0.5,
                'price_volatility': 0.08,
                'regulatory_risk': 0.1,
                'expected_growth': 0.04,
                'infrastructure_projects': 1,
                'favorable_zoning_changes': 0,
                'market_demand': 0.6,
                'population_density': 10000
            },
            "Macul": {
                'crime_rate': 0.045,
                'default_rate': 0.05,
                'flood_risk': 0.1,
                'earthquake_risk': 0.5,
                'price_volatility': 0.1,
                'regulatory_risk': 0.15,
                'expected_growth': 0.02,
                'infrastructure_projects': 0,
                'favorable_zoning_changes': 0,
                'market_demand': 0.4,
                'population_density': 12000
            },
            "Centro": {
                'crime_rate': 0.05,
                'default_rate': 0.04,
                'flood_risk': 0.0,
                'earthquake_risk': 0.5,
                'price_volatility': 0.09,
                'regulatory_risk': 0.2,
                'expected_growth': 0.03,
                'infrastructure_projects': 4,
                'favorable_zoning_changes': 1,
                'market_demand': 0.7,
                'population_density': 15000
            }
        }

    def run_analysis(self):
        """Ejecutar análisis piloto completo"""
        properties = self.get_sample_properties()
        contexts = self.get_neighborhood_contexts()

        print("=" * 80)
        print("DATAPOLIS v5.0 - PILOT CASE: SANTIAGO METROPOLITAN AREA")
        print("=" * 80)
        print(f"Analysis Date: {datetime.now().isoformat()}")
        print(f"Properties Analyzed: {len(properties)}")
        print()

        for prop in properties:
            context = contexts.get(prop.neighborhood, contexts["Centro"])

            print(f"\n{'='*80}")
            print(f"Property: {prop.id}")
            print(f"Location: {prop.neighborhood}, {prop.municipality}")
            print(f"Coordinates: ({prop.location.latitude:.4f}, {prop.location.longitude:.4f})")
            print(f"{'='*80}")

            # Análisis
            result = self.kernel.analyze_property(prop, context)
            self.results.append(result)

            # Mostrar scores
            scores = result['scores']
            print(f"\nSCORES:")
            print(f"  Precession Score:   {scores['precession_score']:6.2f}/100")
            print(f"  Opportunity Score:  {scores['opportunity_score']:6.2f}/100")
            print(f"  Risk Score:         {scores['risk_score']:6.2f}/100")
            print(f"  Confidence Score:   {scores['confidence_score']:6.2f}/100")
            print(f"  Precession Multiplier: {scores['precession_multiplier']:6.2f}x")

            # Mostrar narrativa
            print(f"\nNARRATIVE:")
            print(result['narrative'])

        # Resumen comparativo
        self.print_comparative_summary()

        # Guardar resultados
        self.save_results()

    def print_comparative_summary(self):
        """Imprimir resumen comparativo"""
        print("\n" + "=" * 80)
        print("COMPARATIVE SUMMARY")
        print("=" * 80)

        print(f"\n{'Property ID':<30} {'Precession':<12} {'Opportunity':<12} {'Risk':<12} {'Multiplier':<12}")
        print("-" * 80)

        for result in self.results:
            scores = result['scores']
            print(f"{result['property_id']:<30} "
                  f"{scores['precession_score']:<12.2f} "
                  f"{scores['opportunity_score']:<12.2f} "
                  f"{scores['risk_score']:<12.2f} "
                  f"{scores['precession_multiplier']:<12.2f}")

        # Estadísticas
        precession_scores = [r['scores']['precession_score'] for r in self.results]
        opportunity_scores = [r['scores']['opportunity_score'] for r in self.results]
        risk_scores = [r['scores']['risk_score'] for r in self.results]
        multipliers = [r['scores']['precession_multiplier'] for r in self.results]

        print("\nSTATISTICS:")
        print(f"  Precession Score:   avg={sum(precession_scores)/len(precession_scores):.2f}, "
              f"min={min(precession_scores):.2f}, max={max(precession_scores):.2f}")
        print(f"  Opportunity Score:  avg={sum(opportunity_scores)/len(opportunity_scores):.2f}, "
              f"min={min(opportunity_scores):.2f}, max={max(opportunity_scores):.2f}")
        print(f"  Risk Score:         avg={sum(risk_scores)/len(risk_scores):.2f}, "
              f"min={min(risk_scores):.2f}, max={max(risk_scores):.2f}")
        print(f"  Multiplier:         avg={sum(multipliers)/len(multipliers):.2f}, "
              f"min={min(multipliers):.2f}, max={max(multipliers):.2f}")

    def save_results(self):
        """Guardar resultados a archivo JSON"""
        output_file = os.path.join(os.path.dirname(__file__), 'santiago_results.json')

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)

        print(f"\n✅ Results saved to: {output_file}")


if __name__ == "__main__":
    pilot = SantiagoPilot()
    pilot.run_analysis()
