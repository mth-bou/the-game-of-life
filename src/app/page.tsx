"use client";

import React, { useState } from "react";
import "./../../public/app.css";
import useGrid from "@/hooks/useGrid.v2";
import useSimulationTimer from "@/hooks/useSimulationTimer";
import ControlsPanel from "@/components/ControlsPanel";
import GridCanvas from "@/components/GridCanvas";
import { GridProvider, useGridContext } from "@/context/GridContext";
import { calculateIntervalSpeed } from "@/utils/gridUtils";


const App: React.FC = () => {
    return (
        <GridProvider>
            <MainApp />
        </GridProvider>
    );
};


const MainApp = () => {

    const {
        running,
        setRunning,
        generationCount,
        intervalMs,
        setIntervalMs,
        resetGrid,
        handleSelectPattern,
        simulateNextGeneration
    } = useGridContext();

    // Calcul de générations par seconde
    const generationsPerSecond = 1000 / intervalMs;

    // Handle pour modifier la durée de la simulation
    const handleChangeSpeed = (values: number[]) => {
        const value = values[0]; // valeur du slider de 0 à 100
        const newIntervalMs = calculateIntervalSpeed(value);
        setIntervalMs(newIntervalMs);
    };

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
            {/*<Grid grid={grid} toggleCellState={toggleCellState}/>*/}
            <GridCanvas/>
        </div>
    );
}

export default App;
