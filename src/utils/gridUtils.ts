import { Patterns } from '@/lib/patterns';

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

export const findPatternByKey = (patternKey: string, patterns: Patterns): boolean[][] | null => {
    for (const category of Object.values(patterns)) {
        if (category[patternKey]) {
            return category[patternKey];
        }
    }
    return null;
}
