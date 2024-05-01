import { useCallback, useState } from "react";
import { generateGridFromPattern, generateEmptyGrid, numRows, numCols } from "@/utils/gridUtils";
import { getPatterns } from "@/lib/patterns";
import { findPatternByKey } from "@/utils/gridUtils";

const useGrid = (initialPatternKey: string) => {
    const [generationCount, setGenerationCount] = useState(0);
    const [selectedPatternKey, setSelectedPatternKey] = useState(initialPatternKey);

    const patterns = getPatterns();

    // utilisation de la fonction utilitaire pour trouver le pattern selon la clé et le stocker dans l'état
    const [grid, setGrid] = useState(() => {
        const initialPattern = findPatternByKey(initialPatternKey, patterns);
        return generateGridFromPattern(initialPattern ?? generateEmptyGrid());
    });

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
        const pattern = findPatternByKey(selectedPatternKey, patterns);

        if (pattern) {
            setGrid(generateGridFromPattern(pattern));
            setGenerationCount(0);
        } else {
            console.error("Pattern not found: ", selectedPatternKey);
            setGrid(generateEmptyGrid());
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
        let selectedPattern = null;

        // Parcourir toutes les catégories pour trouver le pattern
        for (const category of Object.values(patterns)) {
            if (category[patternKey]) {
                selectedPattern = category[patternKey];
                break;
            }
        }

        if (!selectedPattern) {
            console.error("Selected pattern is not defined:", patternKey);
            return; // Sortie anticipée si le motif n'est pas trouvé
        }

        // Si le pattern est trouvé, mettre à jour la grille avec ce pattern
        setGrid(generateGridFromPattern(selectedPattern));
        setSelectedPatternKey(patternKey); // Mise à jour de la clé du pattern sélectionné
        setGenerationCount(0); // Réinitialiser le compte des générations
    }, []);

    return { grid, setGrid, toggleCellState, resetGrid, computeNextGrid, generationCount, handleSelectPattern };
}

export default useGrid;
