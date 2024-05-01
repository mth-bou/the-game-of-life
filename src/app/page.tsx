"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./../../public/app.css";
import Grid from "@/components/Grid";
import SetSimulationSpeedSlider from "@/components/SetSimulationSpeedSlider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Pattern {
    [key: string]: boolean[][];
}

const numRows = 40;
const numCols = 80;

const generateEmptyGrid = () => {
    return Array.from({ length: numRows }).map(() => Array.from({ length: numCols }, () => false));
}

const patterns: Pattern = {
    empty: generateEmptyGrid(),
    glider: [
        [false, true, false],
        [false, false, true],
        [true, true, true]
    ],
    toad: [
        [false, true, true, true],
        [true, true, true, true]
    ]
}

const generateGridFromPattern = (pattern: boolean[][]) => {
    const newGrid = generateEmptyGrid();
    // Génère un pattern au centre de la grille
    const startRow = Math.floor((numRows - pattern.length) / 2);
    const startCol = Math.floor((numCols - pattern[0].length) / 2);

    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            newGrid[startRow + i][startCol + j] = pattern[i][j];
        }
    }
    return newGrid;
}

const App: React.FC = () => {
    // Exemple initial de grille
    const [currentGrid, setCurrentGrid] = useState<boolean[][]>(patterns.empty);
    const [running, setRunning] = useState<boolean>(false);
    const [intervalMs, setIntervalMs] = useState<number>(1000);
    const [generationCount, setGenerationCount] = useState<number>(0);
    const [selectedPatternKey, setSelectedPatternKey] = useState<string>("empty");

    // Calcul de générations par seconde
    const generationsPerSecond = 1000 / intervalMs;

    // Handle pour modifier la durée de la simulation
    const handleChangeSpeed = (values: number[]) => {
        const value = values[0];
        const newIntervalMs = 2000 - 19 * value;
        setIntervalMs(newIntervalMs);
    };

    // Permet l'activation/désactivation d'une cellule au clic
    const toggleCellState = (row: number, col: number) => {

        setCurrentGrid(currentGrid => {
            const newGrid = currentGrid.map((currentRow, rowIndex) => {
                if (rowIndex === row) {
                    return currentRow.map((cell, colIndex) => {
                        if (colIndex === col) {
                            return !cell; // Inverse l'état de la cellule
                        } else {
                            return cell; // Garde l'état de la cellule inchangé
                        }
                    });
                } else {
                    return [...currentRow]; // Retourne une copie de la ligne non modifiée
                }
            });
            return newGrid;
        });

    }

    // Réinitialiation de la grille selon le pattern sélectionné
    const resetGrid = () => {
        setRunning(false);
        setGenerationCount(0);
        if (selectedPatternKey && patterns[selectedPatternKey]) {
            const newGrid = generateGridFromPattern(patterns[selectedPatternKey]);
            setCurrentGrid(newGrid);
        } else {
            setCurrentGrid(generateEmptyGrid()); // Fallback si aucun pattern n'est sélectionné
        }
    }

    const computeNextGrid = useCallback(() => {
        setCurrentGrid(grid => {
            const nextGrid = generateEmptyGrid();

            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {

                    let neighbors = 0;

                    for (let di = -1; di <= 1; di++) {
                        for (let dj = -1; dj <= 1; dj++) {
                            if (di === 0 && dj === 0) continue;

                            const ni = i + di;
                            const nj = j + dj;

                            if (ni >= 0 && ni < numRows && nj >= 0 && nj < numCols) {
                                neighbors += grid[ni][nj] ? 1 : 0;
                            }
                        }
                    }

                    if (neighbors < 2 || neighbors > 3) {
                        nextGrid[i][j] = false;
                    } else if (grid[i][j] && (neighbors === 2 || neighbors === 3)) {
                        nextGrid[i][j] = true;
                    } else if (!grid[i][j] && neighbors === 3) {
                        nextGrid[i][j] = true;
                    }
                }
            }

            return nextGrid;
        });
        setGenerationCount(g => g + 1);
    }, []);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (running) {
            timerId = setInterval(computeNextGrid, intervalMs);
        }
        return () => clearInterval(timerId);
    }, [running, intervalMs, computeNextGrid]);

    const handleSelectPattern = (patternKey: string) => {
        const pattern = patterns[patternKey];

        if (!pattern) {
            console.error("Selected pattern is not defined:", patternKey);
            return; // Sortie anticipée si le motif n'est pas trouvé
        }

        const newGrid = generateGridFromPattern(pattern);
        setCurrentGrid(newGrid);
        setRunning(false);
        setGenerationCount(0);
        setSelectedPatternKey(patternKey); // Mise à jour de l'état du pattern sélectionné
    }

    return (
        <div>
            <Button size="sm" onClick={() => {
                setRunning(!running);
            }}>
                {running ? 'Stop' : 'Start'}
            </Button>
            <Button size="sm" onClick={resetGrid}>
                Reset
            </Button>
            <Select onValueChange={(value) => handleSelectPattern(value)}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select a pattern"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Object.keys(patterns).map(key => (
                            <SelectItem key={key} value={key}>{key}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <SetSimulationSpeedSlider onValueChange={handleChangeSpeed}/>
            <div>Vitesse : {generationsPerSecond.toFixed(2)} generation / s</div>
            <div>Génération : {generationCount}</div>
            <Grid grid={currentGrid} toggleCellState={toggleCellState}/>
        </div>
    );
}

export default App;
