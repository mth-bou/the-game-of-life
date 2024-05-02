import React, { createContext, ReactNode, useContext, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { LiveCells } from "@/components/GridCanvas";

interface GridContextType {
    liveCells: LiveCells;
    setLiveCells: React.Dispatch<React.SetStateAction<LiveCells>>;
    scale: number;
    setScale: (scale: number) => void;
    offsetX: number;
    setOffsetX: (offsetX: number) => void;
    offsetY: number;
    setOffsetY: (offsetY: number) => void;
    handleWheel: (event: KonvaEventObject<WheelEvent>) => void;
    handleDragEnd: (event: KonvaEventObject<DragEvent>) => void;
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

    const minScale = 0.01;
    const maxScale = 2;

    // Gestion du zoom et dézoom
    const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault();
        const scaleBy = 1.1;
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
        <GridContext.Provider value={{ liveCells, setLiveCells, scale, setScale, offsetX, setOffsetX, offsetY, setOffsetY, handleWheel, handleDragEnd }}>
            {children}
        </GridContext.Provider>
    );
};
