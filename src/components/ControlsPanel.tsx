import React from 'react';
import { Button } from "@/components/ui/button";
import SetSimulationSpeedSlider from "@/components/SetSimulationSpeedSlider";
import PatternSelector from "@/components/PatternSelector";

interface ControlsPanelProps {
    running: boolean;
    setRunning: (running: boolean) => void;
    resetGrid: () => void;
    onSelectPattern: (patternKey: string) => void;
    handleChangeSpeed: (values: number[]) => void;
    generationsPerSecond: number;
    generationCount: number;
}

const ControlsPanel = ({
   running, setRunning, resetGrid, onSelectPattern, handleChangeSpeed, generationsPerSecond, generationCount
} : ControlsPanelProps) => {
    return (
        <div className="w-full flex justify-center items-center gap-3 m-1">
            <Button size="sm" onClick={() => setRunning(!running)}>
                {running ? 'Stop' : 'Start'}
            </Button>
            <Button size="sm" onClick={resetGrid}>Reset</Button>
            <PatternSelector onSelectPattern={onSelectPattern}/>
            <SetSimulationSpeedSlider onValueChange={handleChangeSpeed}/>
            <div>Vitesse : {generationsPerSecond.toFixed(2)} générations/s</div>
            <div>Génération : {generationCount}</div>
        </div>
    );
};

export default ControlsPanel;
