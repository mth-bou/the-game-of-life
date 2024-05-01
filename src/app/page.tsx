"use client";

import React, { useState } from "react";
import "./../../public/app.css";
import Grid from "@/components/Grid";
import useGrid from "@/hooks/useGrid";
import useSimulationTimer from "@/hooks/useSimulationTimer";
import ControlsPanel from "@/components/ControlsPanel";
//import GridCanvas, { LiveCells } from "@/components/GridCanvas";
//import { KonvaEventObject } from "konva/lib/Node";


const App: React.FC = () => {

    const [intervalMs, setIntervalMs] = useState<number>(1000);
    const { grid, toggleCellState, resetGrid, computeNextGrid, generationCount, handleSelectPattern } = useGrid('empty');
    const { running, setRunning } = useSimulationTimer(computeNextGrid, intervalMs);

    /*const [scale, setScale] = useState<number>(1);
    const [offsetX, setOffsetX] = useState<number>(0);
    const [offsetY, setOffsetY] = useState<number>(0);
    const [liveCells, setLiveCells] = useState<LiveCells>(new Set(["0,0", "1,0", "2,1"]));*/

    // Calcul de générations par seconde
    const generationsPerSecond = 1000 / intervalMs;

    // Handle pour modifier la durée de la simulation
    const handleChangeSpeed = (values: number[]) => {
        const value = values[0]; // valeur du slider de 0 à 100
        // Calculer l'intervalle en interpolant entre 1000 ms et 10 ms
        // Lorsque value = 0 (min), interval = 1000 ms (1 gén/sec)
        // Lorsque value = 100 (max), interval = 10 ms (100 gén/sec)
        //const newIntervalMs = 1000 - (990 * (value / 100)); // => Interpolation linéaire

        // Calculer l'intervalle en interpolant entre 1000 ms et 10 ms avec l'interpolation logarithmique
        const minLog = Math.log(1000);
        const maxLog = Math.log(10);
        const scale = (maxLog - minLog) / 100;
        let newIntervalMs = Math.exp(minLog + scale * value);
        newIntervalMs = Math.round(newIntervalMs);
        setIntervalMs(newIntervalMs);
    };

    /*const handleWheel = (event: any): void => {
        //event.preventDefault();
        const scaleBy = 1.1;
        const newScale = event.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
        setScale(newScale);
    };

    const handleDragEnd = (e: any): void => {  // Ici le typage exact de `e` dépend de Konva's `DragEvent`
        setOffsetX(e.target.x());
        setOffsetY(e.target.y());
    };*/

    return (
        <div>
            <ControlsPanel
                running={running}
                setRunning={setRunning}
                resetGrid={resetGrid}
                onSelectPattern={handleSelectPattern}
                handleChangeSpeed={handleChangeSpeed}
                generationsPerSecond={generationsPerSecond}
                generationCount={generationCount}
            />
            <Grid grid={grid} toggleCellState={toggleCellState}/>
            {/*<GridCanvas liveCells={liveCells} scale={scale} offsetX={offsetX} offsetY={offsetY} handleWheel={handleWheel} handleDragEnd={handleDragEnd} />*/}
        </div>
    );
}

export default App;
