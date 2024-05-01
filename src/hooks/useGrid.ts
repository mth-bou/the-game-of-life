import { useCallback, useState } from "react";
import { generateGridFromPattern, generateEmptyGrid, numRows, numCols } from "@/utils/gridUtils";
import { patterns } from "@/lib/patterns";

const useGrid = (initialPatternKey: string) => {
    const [grid, setGrid] = useState(() => generateGridFromPattern(patterns[initialPatternKey]));
    const [generationCount, setGenerationCount] = useState(0);
    const [selectedPatternKey, setSelectedPatternKey] = useState(initialPatternKey);

    const toggleCellState = useCallback((row: number, col: number) => {
        setGrid(currentGrid => {
            return currentGrid.map((rowArray, rowIndex) => {
                if (rowIndex === row) {
                    return rowArray.map((cell, colIndex) => colIndex === col ? !cell : cell);
                }
                return rowArray;
            });
        });
    }, []);

    const resetGrid = useCallback(() => {
        if (selectedPatternKey && patterns[selectedPatternKey]) {
            setGrid(generateGridFromPattern(patterns[selectedPatternKey]));
            setGenerationCount(0);
        }

    }, [selectedPatternKey]);

    const computeNextGrid = useCallback(() => {
        setGrid(grid => {
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

    const handleSelectPattern = useCallback((patternKey: string) => {
        const pattern = patterns[patternKey];
        if (!pattern) {
            console.error("Selected pattern is not defined:", patternKey);
            return;
        }
        setGrid(generateGridFromPattern(pattern));
        setSelectedPatternKey(patternKey);
        setGenerationCount(0);
    }, []);

    return { grid, setGrid, toggleCellState, resetGrid, computeNextGrid, generationCount, handleSelectPattern };
}

export default useGrid;
