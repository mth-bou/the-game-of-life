import { useGridContext } from "@/context/GridContext";
import { calculateIntervalSpeed } from "@/utils/gridUtils";
import ControlsPanel from "@/components/ControlsPanel";
import GridCanvas from "@/components/GridCanvas";
import React from "react";

const App = () => {

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
            <GridCanvas/>
        </div>
    );
}

export default App;
