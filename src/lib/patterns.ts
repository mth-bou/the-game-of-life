import { generateEmptyGrid } from "@/utils/gridUtils";

export interface Pattern {
    [key: string]: boolean[][];
}

export interface Patterns {
    [category: string]: Pattern;
}

export const getPatterns = (): Patterns => {
    return {
        initial: {
            empty: generateEmptyGrid()
        },
        stables: {
            block: [
                [true, true],
                [true, true]
            ],
            beehive: [
                [false, true, true, false],
                [true, false, false, true],
                [false, true, true, false]
            ],
            loaf: [
                [false, true, true, false],
                [true, false, false, true],
                [false, true, false, true],
                [false, false, true, false]
            ],
            boat: [
                [true, true, false],
                [true, false, true],
                [false, true, false]
            ],
            tub: [
                [false, true, false],
                [true, false, true],
                [false, true, false]
            ]
        },
        oscillators: {
            blinker: [
                [true, true, true]
            ],
            toad: [
                [false, true, true, true],
                [true, true, true, false]
            ],
        },
        spaceships: {
            glider: [
                [false, true, false],
                [false, false, true],
                [true, true, true]
            ],
            lwss: [
                [true, false, false, true, false],
                [false, false, false, false, true],
                [true, false, false, false, true],
                [false, true, true, true, true]
            ],
            hwss: [
                [false, false, true, true, false, false, false],
                [true, false, false, false, false, true, false],
                [false, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [false, true, true, true, true, true, true]
            ],
        },
        /*mathusalems: [],
        puffers: [],
        guns: [],*/
    }
};
