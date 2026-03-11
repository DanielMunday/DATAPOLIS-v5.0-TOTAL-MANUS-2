/**
 * DATAPOLIS v5.0 - Backend Server (Node.js + Express + tRPC)
 * API Gateway y Orquestador de módulos
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import * as trpcNext from '@trpc/server/adapters/express';
import { PythonShell } from 'python-shell';
import path from 'path';

// ============================================================================
// TIPOS Y ESQUEMAS
// ============================================================================

const PropertyInputSchema = z.object({
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  area_sqm: z.number(),
  use_type: z.string(),
  age_years: z.number(),
  condition: z.string(),
  value_per_sqm: z.number(),
  neighborhood: z.string(),
  municipality: z.string(),
  region: z.string(),
  has_parking: z.boolean().optional(),
  has_garden: z.boolean().optional(),
  proximity_to_metro: z.number().optional(),
  proximity_to_schools: z.number().optional(),
  proximity_to_parks: z.number().optional()
});

const NeighborhoodContextSchema = z.object({
  crime_rate: z.number().optional(),
  default_rate: z.number().optional(),
  flood_risk: z.number().optional(),
  earthquake_risk: z.number().optional(),
  price_volatility: z.number().optional(),
  regulatory_risk: z.number().optional(),
  expected_growth: z.number().optional(),
  infrastructure_projects: z.number().optional(),
  favorable_zoning_changes: z.number().optional(),
  market_demand: z.number().optional(),
  population_density: z.number().optional()
});

const AnalysisRequestSchema = z.object({
  property: PropertyInputSchema,
  neighborhood_context: NeighborhoodContextSchema
});

// ============================================================================
// TRPC ROUTER
// ============================================================================

import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const appRouter = t.router({
  // Análisis Precesional
  precession: t.router({
    analyze: t.procedure
      .input(AnalysisRequestSchema)
      .query(async ({ input }) => {
        return new Promise((resolve, reject) => {
          const options = {
            mode: 'text' as const,
            pythonPath: '/usr/bin/python3',
            scriptPath: path.join(__dirname, '../backend'),
            args: [JSON.stringify(input)]
          };

          PythonShell.run('kernel_precesional.py', options, (err, results) => {
            if (err) reject(err);
            else resolve(JSON.parse(results?.[0] || '{}'));
          });
        });
      }),

    getZones: t.procedure
      .input(z.object({
        latitude: z.number(),
        longitude: z.number()
      }))
      .query(({ input }) => {
        const angles = [0, 45, 90, 135, 180];
        const radii = [300, 500, 1000, 2000, 5000];

        return {
          zones: angles.flatMap(angle =>
            radii.map(radius => ({
              id: `zone_${angle}_${radius}`,
              angle,
              radius,
              center: {
                latitude: input.latitude,
                longitude: input.longitude
              }
            }))
          ),
          total_zones: angles.length * radii.length
        };
      })
  }),

  // Análisis Hedónico
  hedonic: t.router({
    predictValue: t.procedure
      .input(z.object({
        area_sqm: z.number(),
        age_years: z.number(),
        bedrooms: z.number(),
        bathrooms: z.number(),
        parking: z.number(),
        latitude: z.number(),
        longitude: z.number()
      }))
      .query(({ input }) => {
        // Modelo hedónico simplificado
        const basePrice = 3000;
        const areaEffect = input.area_sqm * 10;
        const ageEffect = input.age_years * -50;
        const bedroomEffect = input.bedrooms * 500;
        const bathroomEffect = input.bathrooms * 300;
        const parkingEffect = input.parking * 200;

        // Efecto de ubicación (simulado)
        const locationEffect = Math.sin(input.latitude) * 1000;

        const predictedValue = basePrice + areaEffect + ageEffect + 
                              bedroomEffect + bathroomEffect + 
                              parkingEffect + locationEffect;

        return {
          predicted_value_per_sqm: Math.max(1000, predictedValue),
          total_value: Math.max(100000, predictedValue * input.area_sqm),
          confidence: 0.85,
          model_type: 'SAR',
          components: {
            base_price: basePrice,
            area_effect: areaEffect,
            age_effect: ageEffect,
            bedroom_effect: bedroomEffect,
            bathroom_effect: bathroomEffect,
            parking_effect: parkingEffect,
            location_effect: locationEffect
          }
        };
      })
  }),

  // Servicios Ecosistémicos
  ecosystemServices: t.router({
    calculateESV: t.procedure
      .input(z.object({
        latitude: z.number(),
        longitude: z.number(),
        land_use: z.string(),
        area_sqm: z.number()
      }))
      .query(({ input }) => {
        // Valores de servicios ecosistémicos por tipo de uso (USD/año)
        const esvValues: Record<string, number> = {
          'residential': 2000,
          'commercial': 1000,
          'industrial': 500,
          'green_space': 5000,
          'water': 8000,
          'forest': 10000
        };

        const valuePerSqm = esvValues[input.land_use] || 1000;
        const totalValue = (valuePerSqm * input.area_sqm) / 10000;

        return {
          land_use: input.land_use,
          value_per_sqm_year: valuePerSqm / 10000,
          total_annual_value: totalValue,
          services: {
            carbon_sequestration: totalValue * 0.3,
            water_regulation: totalValue * 0.25,
            pollination: totalValue * 0.2,
            recreation: totalValue * 0.15,
            other: totalValue * 0.1
          }
        };
      })
  }),

  // Riesgo Sistémico
  risk: t.router({
    analyzePortfolioRisk: t.procedure
      .input(z.object({
        property_ids: z.array(z.string()),
        time_horizon: z.number()
      }))
      .query(({ input }) => {
        const n = input.property_ids.length;

        // Simulación de riesgos
        const defaultRisk = 0.03 * n;
        const marketRisk = 0.05 * input.time_horizon;
        const concentrationRisk = Math.log(n + 1) * 0.02;
        const systematicRisk = 0.04;

        const totalRisk = defaultRisk + marketRisk + concentrationRisk + systematicRisk;
        const var95 = totalRisk * 1.645;  // Value at Risk (95%)
        const cvar95 = var95 * 1.3;  // Conditional VaR

        return {
          portfolio_size: n,
          time_horizon_years: input.time_horizon,
          risks: {
            default_risk: defaultRisk,
            market_risk: marketRisk,
            concentration_risk: concentrationRisk,
            systematic_risk: systematicRisk,
            total_risk: totalRisk
          },
          var_95: var95,
          cvar_95: cvar95,
          risk_level: totalRisk > 0.15 ? 'HIGH' : totalRisk > 0.08 ? 'MEDIUM' : 'LOW'
        };
      })
  }),

  // Reportes
  reports: t.router({
    generateReport: t.procedure
      .input(z.object({
        analysis_id: z.string(),
        format: z.enum(['json', 'pdf', 'excel'])
      }))
      .mutation(async ({ input }) => {
        // Simular generación de reporte
        return {
          report_id: `REPORT_${Date.now()}`,
          analysis_id: input.analysis_id,
          format: input.format,
          status: 'generated',
          url: `/reports/${input.analysis_id}.${input.format}`,
          generated_at: new Date().toISOString()
        };
      })
  }),

  // Health check
  health: t.procedure.query(() => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '5.0.0'
  }))
});

export type AppRouter = typeof appRouter;

// ============================================================================
// EXPRESS SERVER
// ============================================================================

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// tRPC
app.use('/trpc', trpcNext.createExpressMiddleware({ router: appRouter }));

// Health endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'DATAPOLIS v5.0 Backend',
    version: '5.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Documentation
app.get('/api/docs', (req: Request, res: Response) => {
  res.json({
    service: 'DATAPOLIS v5.0 - Backend API',
    version: '5.0.0',
    endpoints: {
      'POST /trpc/precession.analyze': 'Análisis precesional completo',
      'GET /trpc/precession.getZones': 'Obtener zonas precesionales',
      'GET /trpc/hedonic.predictValue': 'Predicción de valor hedónico',
      'GET /trpc/ecosystemServices.calculateESV': 'Cálculo de servicios ecosistémicos',
      'GET /trpc/risk.analyzePortfolioRisk': 'Análisis de riesgo de cartera',
      'POST /trpc/reports.generateReport': 'Generar reporte'
    },
    documentation: 'https://datapolis.city/docs'
  });
});

// Error handling
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ DATAPOLIS v5.0 Backend running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});

export default app;
