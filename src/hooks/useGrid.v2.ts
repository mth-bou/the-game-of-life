import { useCallback, useState } from "react";
import { patterns } from "@/lib/patterns.v2";

const useGrid = (initialPatternKey: string) => {
    const [generationCount, setGenerationCount] = useState(0);
    const [selectedPatternKey, setSelectedPatternKey] = useState(initialPatternKey);

    // Découper la clé pour séparer la catégorie du nom du pattern
    const [category, patternName] = initialPatternKey.split(':');
    const initialPattern = patterns[category] && patterns[category][patternName] ? patterns[category][patternName] : new Set<string>();

    const [grid, setGrid] = useState(new Set<string>(initialPattern));


    const toggleCellState = useCallback((coord: string) => {
        setGrid(prevGrid => {
            const newGrid = new Set(prevGrid);
            if (newGrid.has(coord)) {
                newGrid.delete(coord);
            } else {
                newGrid.add(coord);
            }
            return newGrid;
        });
    }, []);


    const resetGrid = useCallback(() => {
        if (patterns[category] && patterns[category][patternName]) {
            setGrid(new Set<string>(patterns[category][patternName]));
        } else {
            console.error("Pattern not found: ", selectedPatternKey);
            setGrid(new Set<string>());
        }
        setGenerationCount(0);
    }, [category, patternName, selectedPatternKey]);


    const handleSelectPattern = useCallback((newPatternKey: string) => {
        const [newCategory, newPatternName] = newPatternKey.split(':');
        setSelectedPatternKey(newPatternKey);
        if (patterns[newCategory] && patterns[newCategory][newPatternName]) {
            setGrid(new Set<string>(patterns[newCategory][newPatternName]));
            setGenerationCount(0);
        } else {
            console.error("Selected pattern is not defined:", newPatternKey);
        }
    }, []);


    const computeNextGrid = useCallback((currentGrid: Set<string>) => {
        const newGrid = new Set<string>();
        const checkCells = new Map<string, number>(); // Map to count living neighbors

        // Step 1: Collect all cells that need to be checked
        currentGrid.forEach(coord => {
            const [x, y] = coord.split(',').map(Number);
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const neighborKey = `${x + dx},${y + dy}`;
                    checkCells.set(neighborKey, (checkCells.get(neighborKey) || 0) + 1);
                }
            }
        });

        // Step 2: Determine which cells will be alive in the next generation
        checkCells.forEach((count, key) => {
            const isAlive = currentGrid.has(key);
            const neighbors = count - (isAlive ? 1 : 0); // Subtract self count if alive
            if (neighbors === 3 || (isAlive && neighbors === 2)) {
                newGrid.add(key);
            }
        });

        return newGrid;
    }, []);

    // This would be used to update the grid state
    const updateGrid = () => {
        setGrid(grid => computeNextGrid(grid));
        setGenerationCount(g => g + 1);
    };

    return { grid, setGrid, toggleCellState, resetGrid, handleSelectPattern, updateGrid, generationCount };
}

export default useGrid;
