<?php

namespace App\Services\PAE;

use Illuminate\Support\Facades\Http;

class PrecessionMLConnector
{
    /**
     * Get predictions from the ML model.
     *
     * @param array $data
     * @return array
     */
    public function getPredictions(array $data): array
    {
        try {
            $response = Http::post('http://ollama:11434/api/generate', [
                'model' => 'datapolis-ml-model',
                'prompt' => json_encode($data),
            ]);

            if ($response->successful()) {
                return $response->json();
            }
        } catch (\Exception $e) {
            // Fallback to deterministic rules if Ollama is not available
        }

        return ["predictions" => [], "confidence_intervals" => []];
    }
}
