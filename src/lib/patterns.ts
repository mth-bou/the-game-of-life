import { generateEmptyGrid } from "@/utils/gridUtils";

export interface Pattern {
    [key: string]: boolean[][];
}

export const patterns: Pattern = {
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
};
