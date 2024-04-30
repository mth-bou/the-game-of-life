"use client";

import React, {useState, useEffect, useCallback} from "react";
import "./../../public/app.css";
import Grid from "@/components/Grid";

const numRows = 20;
const numCols = 40;

const generateEmptyGrid = () => {
    return Array.from({ length: numRows }).map(() => Array.from({ length: numCols }, () => false));
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
    const [currentGrid, setCurrentGrid] = useState<boolean[][]>(() => generateEmptyGrid());
    const [running, setRunning] = useState<boolean>(false);
    const [intervalMs, setIntervalMs] = useState<number>(100);

    const runSimulation = useCallback(() => {
        if (!running) return;

        setCurrentGrid(g => computeNextGrid(g));

        setTimeout(runSimulation, intervalMs);

    }, [running, intervalMs]);

    return (
        <div>
            <button onClick={() => { setRunning(!running); if (!running) { runSimulation(); }}}>
                {running ? 'Stop' : 'Start'}
            </button>
            <Grid grid={currentGrid} />
        </div>
    );
}

export default App;
