'''<?php

namespace App\Services\PAE;

use SplPriorityQueue;

class PrecessionGraphEngine
{
    private $graph;

    public function __construct()
    {
        $this->graph = [];
    }

    public function addNode($node)
    {
        if (!isset($this->graph[$node])) {
            $this->graph[$node] = [];
        }
    }

    public function addEdge($node1, $node2, $weight)
    {
        $this->addNode($node1);
        $this->addNode($node2);
        $this->graph[$node1][$node2] = $weight;
    }

    public function analyzePrecession(array $properties): array
    {
        foreach ($properties as $property) {
            $this->addNode($property['id']);
            foreach ($property['relations'] as $relation) {
                $this->addEdge($property['id'], $relation['target_id'], $relation['weight']);
            }
        }

        $scores = $this->calculatePrecessionScores();

        return ['precession_scores' => $scores];
    }

    private function calculatePrecessionScores(): array
    {
        $scores = [];
        foreach (array_keys($this->graph) as $node) {
            $scores[$node] = $this->dijkstra($node);
        }
        return $scores;
    }

    private function dijkstra($startNode): array
    {
        $distances = [];
        $queue = new SplPriorityQueue();

        foreach (array_keys($this->graph) as $node) {
            $distances[$node] = INF;
        }

        $distances[$startNode] = 0;
        $queue->insert($startNode, 0);

        while (!$queue->isEmpty()) {
            $currentNode = $queue->extract();

            if ($distances[$currentNode] === INF) {
                break;
            }

            foreach ($this->graph[$currentNode] as $neighbor => $weight) {
                $newDist = $distances[$currentNode] + $weight;
                if ($newDist < $distances[$neighbor]) {
                    $distances[$neighbor] = $newDist;
                    $queue->insert($neighbor, -$newDist);
                }
            }
        }

        return $distances;
    }
}
'''
