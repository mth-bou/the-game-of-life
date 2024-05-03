// WORK IN PROGRESS
// USES KONVA.JS TO DRAW THE GRID
import { Stage, Layer, Rect, Line } from 'react-konva';
import React, { memo, useEffect, useState } from "react";
import { useGridContext } from "@/context/GridContext";

const GridCanvas = memo(() => {

    const { liveCells, scale, offsetX, offsetY, handleWheel, handleDragEnd } = useGridContext();
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

    // taille initiale d'une cellule en pixels
    const cellSize = 40;

    // Vérification que la variable globale window est définie car elle n'est pas disponible côté serveur
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    }, []);

    const { width: windowWidth, height: windowHeight } = windowDimensions;

    // Calculer le centre de la fenêtre pour positionner les patterns
    const centerX = Math.floor((windowWidth / 2 - offsetX) / (cellSize * scale));
    const centerY = Math.floor((windowHeight / 2 - offsetY) / (cellSize * scale));

    // S'assurer que le fond couvre même les zones dézoomées/déplacées
    const extraPadding = 2000; // Ajouter un padding pour couvrir les zones au-delà de l'écran
    const gridWidth = Math.ceil((windowWidth + extraPadding) / scale);
    const gridHeight = Math.ceil((windowHeight + extraPadding) / scale);

    // Calculer les positions ajustées pour le début de la grille
    // S'assurer que le rectangle commence plus loin dans les négatifs pour couvrir toutes les directions
    const startX = Math.floor((-offsetX / scale) - extraPadding / 2);
    const startY = Math.floor((-offsetY / scale) - extraPadding / 2)

    // Calculer le nombre de cellules à dessiner dans chaque direction
    const numCellsWide = Math.ceil(gridWidth / cellSize) + 1;
    const numCellsHigh = Math.ceil(gridHeight / cellSize) + 1;

    return (
        <Stage
            width={windowWidth}
            height={windowHeight}
            scaleX={scale}
            scaleY={scale}
            x={offsetX}
            y={offsetY}
            onWheel={handleWheel}
            onDragEnd={handleDragEnd}
            draggable
        >
            <Layer>
                {/* Fond de la grille */}
                <Rect
                    x={startX}
                    y={startY}
                    width={gridWidth}
                    height={gridHeight}
                    fill="#232323"
                />
                {/* Lignes verticales de la grille */}
                {Array.from({ length: numCellsWide }, (_, i) => startX + i * cellSize).map(x => (
                    <Line
                        key={`v-${x}`}
                        points={[x, startY, x, startY + numCellsHigh * cellSize]}
                        stroke="#d2d2d2"
                        strokeWidth={0.5 / scale} // Ajustez l'épaisseur en fonction du zoom
                    />
                ))}
                {/* Lignes horizontales de la grille */}
                {Array.from({ length: numCellsHigh }, (_, i) => startY + i * cellSize).map(y => (
                    <Line
                        key={`h-${y}`}
                        points={[startX, y, startX + numCellsWide * cellSize, y]}
                        stroke="#d2d2d2"
                        strokeWidth={0.5 / scale} // Ajustez l'épaisseur en fonction du zoom
                    />
                ))}
                {/* Cellules vivantes */}
                {Array.from(liveCells).map((cell, i) => {
                    const [x, y] = cell.split(',').map(Number);
                    // Adjust x and y to be centered
                    const adjustedX = (x - centerX) * cellSize;
                    const adjustedY = (y - centerY) * cellSize;

                    return (
                        <Rect
                            key={i}
                            x={adjustedX}
                            y={adjustedY}
                            width={cellSize}
                            height={cellSize}
                            fill="#eeeeee"
                        />
                    )
                })}
            </Layer>
        </Stage>
    );
});

GridCanvas.displayName = 'GridCanvas';

export default GridCanvas;
