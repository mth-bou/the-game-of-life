"use client";

import React, { useState } from "react";
import "./../../public/app.css";
import useGrid from "@/hooks/useGrid";
import useSimulationTimer from "@/hooks/useSimulationTimer";
import ControlsPanel from "@/components/ControlsPanel";
import GridCanvas from "@/components/GridCanvas";
import { GridProvider } from "@/context/GridContext";
import { calculateIntervalSpeed } from "@/utils/gridUtils";


const App: React.FC = () => {

    // A l'état initial, la simulation a une durée de 1 génération / seconde
    const [intervalMs, setIntervalMs] = useState<number>(1000);
    const {
        grid,
        toggleCellState,
        resetGrid,
        computeNextGrid,
        generationCount,
        handleSelectPattern
    } = useGrid('empty');
    const { running, setRunning } = useSimulationTimer(computeNextGrid, intervalMs);

    // Calcul de générations par seconde
    const generationsPerSecond = 1000 / intervalMs;

    // Handle pour modifier la durée de la simulation
    const handleChangeSpeed = (values: number[]) => {
        const value = values[0]; // valeur du slider de 0 à 100
        const newIntervalMs = calculateIntervalSpeed(value);
        setIntervalMs(newIntervalMs);
    };

    return (
        <GridProvider>
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
        </GridProvider>
    );
}

export default App;
