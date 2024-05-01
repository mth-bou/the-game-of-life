// WORK IN PROGRESS
// USES KONVA.JS TO DRAW THE GRID

import { Stage, Layer, Rect } from 'react-konva';
import React from "react";
import { KonvaEventObject } from "konva/lib/Node";

// taille initiale d'une cellule en pixels
const cellSize = 10;

type Cell = string;  // Format "x,y"
export type LiveCells = Set<Cell>;

type GridCanvasProps = {
    liveCells: LiveCells;
    scale: number | undefined;
    offsetX: number | undefined;
    offsetY: number | undefined;
    handleWheel: (event: KonvaEventObject<WheelEvent>) => void;
    handleDragEnd: (event: any) => void;
};

const GridCanvas = ({ liveCells, scale, offsetX, offsetY, handleWheel, handleDragEnd }: GridCanvasProps) => {
    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale}
            scaleY={scale}
            x={offsetX}
            y={offsetY}
            onWheel={handleWheel}
            onDragEnd={handleDragEnd}
            draggable
        >
            <Layer>
                {Array.from(liveCells).map((cell, i) => {
                    const [x, y] = cell.split(',').map(Number);
                    return <Rect key={i} x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize} fill="green" />;
                })}
            </Layer>
        </Stage>
    );
}

export default GridCanvas;
