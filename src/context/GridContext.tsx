import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { patterns } from "@/lib/patterns.v2";
import { unifiedPatterns } from "@/utils/gridUtils.v2";

type Cell = string;  // Format "x,y"
export type LiveCells = Set<Cell>;

interface GridContextType {
    liveCells: LiveCells;
    setLiveCells: React.Dispatch<React.SetStateAction<LiveCells>>;
    running: boolean;
    setRunning: React.Dispatch<React.SetStateAction<boolean>>;
    generationCount: number;
    intervalMs: number;
    setIntervalMs: React.Dispatch<React.SetStateAction<number>>;
    scale: number;
    setScale: (scale: number) => void;
    offsetX: number;
    setOffsetX: (offsetX: number) => void;
    offsetY: number;
    setOffsetY: (offsetY: number) => void;
    toggleCellState: (cell: Cell) => void;
    resetGrid: (patternKey: string) => void;
    handleSelectPattern: (patternKey: string) => void;
    handleWheel: (event: KonvaEventObject<WheelEvent>) => void;
    handleDragEnd: (event: KonvaEventObject<DragEvent>) => void;
    simulateNextGeneration: () => void;
}

const GridContext = createContext<GridContextType | null>(null);

export const useGridContext = () => {
    const context = useContext(GridContext);
    if (!context) {
        throw new Error("useGridContext must be used within a GridProvider");
    }
    return context;
}

interface GridProviderProps {
    children: ReactNode;
}

export const GridProvider = ({ children }: GridProviderProps) => {
    const [scale, setScale] = useState<number>(1);
    const [liveCells, setLiveCells] = useState<LiveCells>(new Set());
    const [offsetX, setOffsetX] = useState<number>(0);
    const [offsetY, setOffsetY] = useState<number>(0);
    const [running, setRunning] = useState(false);
    const [intervalMs, setIntervalMs] = useState<number>(1000); // durée de 1 génération / seconde
    const [generationCount, setGenerationCount] = useState(0);

    const simulateNextGeneration = useCallback(() => {
        const newLiveCells = new Set<string>();
        const neighborCounts = new Map<string, number>();

        // Compter les voisins pour chaque cellule vivante
        liveCells.forEach(cell => {
            const [x, y] = cell.split(',').map(Number);
            const neighbors = [
                `${x-1},${y-1}`, `${x},${y-1}`, `${x+1},${y-1}`,
                `${x-1},${y}`, `${x+1},${y}`,
                `${x-1},${y+1}`, `${x},${y+1}`, `${x+1},${y+1}`
            ];

            neighbors.forEach(neighbor => {
                neighborCounts.set(neighbor, (neighborCounts.get(neighbor) || 0) + 1);
            });

            // S'assurer que la cellule vivante actuelle est dans la map pour la considérer pour la survie
            if (!neighborCounts.has(cell)) {
                neighborCounts.set(cell, 0);
            }
        });

        // Appliquer les règles du jeu de la vie à chaque cellule ayant des voisins
        neighborCounts.forEach((count, cell) => {
            if (count === 3 || (count === 2 && liveCells.has(cell))) {
                newLiveCells.add(cell); // La cellule survit ou naît
            }
        });

        setLiveCells(newLiveCells); // Mise à jour de l'état avec les nouvelles cellules vivantes
        setGenerationCount(prev => prev + 1);

    }, [liveCells, setLiveCells]);

    useEffect(() => {
        if (!running) return;

        const intervalId = setInterval(simulateNextGeneration, intervalMs);
        return () => clearInterval(intervalId);

    }, [running, intervalMs, simulateNextGeneration]);

    const toggleCellState = useCallback((cell: string) => {
        setLiveCells(prev => {
            const newSet = new Set(prev);
            if (newSet.has(cell)) {
                newSet.delete(cell);
            } else {
                newSet.add(cell);
            }
            return newSet;
        });
    }, []);

    const resetGrid = useCallback((patternKey: string) => {
        const pattern = unifiedPatterns[patternKey];
        if (pattern) {
            setLiveCells(new Set(pattern));
        } else {
            console.error("Pattern not found:", patternKey);
            setLiveCells(new Set());
        }
    }, []);

    const handleSelectPattern = useCallback((patternKey: string) => {
        const pattern = unifiedPatterns[patternKey];
        if (pattern) {
            setLiveCells(new Set(pattern));
        } else {
            console.error("Pattern not found:", patternKey);
        }
    }, []);

    // Gestion du zoom et dézoom
    const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault();
        const scaleBy = 1.1;
        const minScale = 0.01;
        const maxScale = 2;
        //const newScale = event.evt.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
        let newScale = scale * (event.evt.deltaY > 0 ? 1 / scaleBy : scaleBy);
        newScale = Math.max(minScale, Math.min(newScale, maxScale));
        setScale(newScale);
    }

    // Gestion du déplacement de la grille
    const handleDragEnd = (event: KonvaEventObject<DragEvent>) => {
        setOffsetX(event.target.x());
        setOffsetY(event.target.y());
    }

    return (
        <GridContext.Provider
            value={{
                liveCells, setLiveCells,
                running, setRunning,
                generationCount,
                intervalMs, setIntervalMs,
                scale, setScale,
                offsetX, setOffsetX,
                offsetY, setOffsetY,
                toggleCellState, resetGrid, handleSelectPattern,
                handleWheel, handleDragEnd,
                simulateNextGeneration
        }}>
            {children}
        </GridContext.Provider>
    );
};
