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
