import { CellPattern } from '@/lib/patterns';

// Définition des dimensions globales de la grille pour un accès facile
export const numRows = 40;
export const numCols = 80;

// Fonction pour générer une grille vide
export const generateEmptyGrid = (): boolean[][] => {
    return Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => false));
};

// Fonction pour générer une grille à partir d'un pattern
export const generateGridFromPattern = (pattern: boolean[][]): boolean[][] => {
    const newGrid = generateEmptyGrid();
    const startRow = Math.floor((numRows - pattern.length) / 2);
    const startCol = Math.floor((numCols - pattern[0].length) / 2);

    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            newGrid[startRow + i][startCol + j] = pattern[i][j];
        }
    }
    return newGrid;
};

export const findPatternByKey = (patternKey: string, patterns: CellPattern): boolean[][] | null => {
    for (const category of Object.values(patterns)) {
        if (category[patternKey]) {
            return category[patternKey];
        }
    }
    return null;
}

export const calculateIntervalSpeed = (value: number): number => {
    // Calculer l'intervalle en interpolant entre 1000 ms et 10 ms
    // Lorsque value = 0 (min), interval = 1000 ms (1 gén/sec)
    // Lorsque value = 100 (max), interval = 10 ms (100 gén/sec)
    //const newIntervalMs = 1000 - (990 * (value / 100)); // => Interpolation linéaire

    // Calculer l'intervalle en interpolant entre 1000 ms et 10 ms avec l'interpolation logarithmique
    const minLog = Math.log(1000);
    const maxLog = Math.log(10);
    const scale = (maxLog - minLog) / 100;
    let intervalMs = Math.exp(minLog + scale * value);
    return Math.round(intervalMs);
}
