"use client";

import React, { useState } from "react";
import "./../../public/app.css";
import Grid from "@/components/Grid";
import SetSimulationSpeedSlider from "@/components/SetSimulationSpeedSlider";
import { Button } from "@/components/ui/button";
import useGrid from "@/hooks/useGrid";
import useSimulationTimer from "@/hooks/useSimulationTimer";
import PatternSelector from "@/components/PatternSelector";
import ControlsPanel from "@/components/ControlsPanel";


const App: React.FC = () => {

    const [intervalMs, setIntervalMs] = useState<number>(1000);
    const { grid, toggleCellState, resetGrid, computeNextGrid, generationCount, handleSelectPattern } = useGrid('empty');
    const { running, setRunning } = useSimulationTimer(computeNextGrid, intervalMs);

    // Calcul de générations par seconde
    const generationsPerSecond = 1000 / intervalMs;

    // Handle pour modifier la durée de la simulation
    const handleChangeSpeed = (values: number[]) => {
        const value = values[0];
        const newIntervalMs = 2000 - 19 * value;
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
            <Grid grid={grid} toggleCellState={toggleCellState}/>
        </div>
    );
}

export default App;
