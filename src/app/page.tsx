"use client";

import React, {useState, useEffect, useCallback} from "react";
import "./../../public/app.css";
import Grid from "@/components/Grid";

interface Pattern {
    [key: string]: boolean[][];
}

const numRows = 20;
const numCols = 40;

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

const computeNextGrid = (grid: boolean[][]): boolean[][] => {
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
}

const App: React.FC = () => {
    // Exemple initial de grille
    const [currentGrid, setCurrentGrid] = useState<boolean[][]>(patterns.empty);
    const [running, setRunning] = useState<boolean>(false);
    const [intervalMs, setIntervalMs] = useState<number>(100);

    const handleSelectPattern = (patternKey: string) => {
        const pattern = patterns[patternKey];

        if (!pattern) {
            console.error("Selected pattern is not defined:", patternKey);
            return; // Sortie anticipée si le motif n'est pas trouvé
        }

        const newGrid = generateEmptyGrid();
        const startRow = Math.floor((numRows - pattern.length) / 2);
        const startCol = Math.floor((numCols - pattern[0].length) / 2);

        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                newGrid[startRow + i][startCol + j] = pattern[i][j];
            }
        }

        setCurrentGrid(newGrid);
    }

    const runSimulation = useCallback(() => {
        if (!running) return;

        setCurrentGrid(g => computeNextGrid(g));

        setTimeout(runSimulation, intervalMs);

    }, [running, intervalMs]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (running) {
            timer = setTimeout(runSimulation, intervalMs);
        }
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [running, intervalMs, runSimulation]);

    return (
        <div>
            <button onClick={() => {
                setRunning(!running);
                if (!running) runSimulation();
            }}>
                {running ? 'Stop' : 'Start'}
            </button>
            <select onChange={(e) => handleSelectPattern(e.target.value)}>
                {Object.keys(patterns).map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
            <Grid grid={currentGrid} />
        </div>
    );
}

export default App;
