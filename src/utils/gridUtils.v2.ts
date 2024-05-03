import { patterns } from '@/lib/patterns.v2';

export const convertArrayToSet = (pattern: boolean[][]): Set<string> => {
    const liveCells = new Set<string>();
    /*for (let y = 0; y < pattern.length; y++) {
        for (let x = 0; x < pattern[y].length; x++) {
            if (pattern[x][y]) {
                liveCells.add(`${x},${y}`);
            }
        }
    }*/
    pattern.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) liveCells.add(`${x},${y}`);
        });
    });
    return liveCells;
}

export const unifiedPatterns = Object.values(patterns).reduce((acc, category) => {
    Object.entries(category).forEach(([key, patternSet]) => {
        acc[key] = patternSet;  // Assurez-vous que chaque clé est unique à travers toutes les catégories
    });
    return acc;
}, {});
