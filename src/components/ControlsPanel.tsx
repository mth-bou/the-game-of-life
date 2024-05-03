import React from 'react';
import { Button } from "@/components/ui/button";
import SetSimulationSpeedSlider from "@/components/SetSimulationSpeedSlider";
import PatternSelector from "@/components/PatternSelector";

interface ControlsPanelProps {
    running: boolean;
    setRunning: (running: boolean) => void;
    resetGrid: (patternKey: string) => void;
    onSelectPattern: (patternKey: string) => void;
    handleChangeSpeed: (values: number[]) => void;
    generationsPerSecond: number;
    generationCount: number;
}

const ControlsPanel = ({
   running, setRunning, resetGrid, onSelectPattern, handleChangeSpeed, generationsPerSecond, generationCount
} : ControlsPanelProps) => {

    return (
        <div className="w-full flex space-x-20 items-center gap-5 absolute z-10 py-2 px-5">
            <div className="flex gap-5">
                <Button size="sm" onClick={() => setRunning(!running)}>
                    {running ? 'Stop' : 'Start'}
                </Button>
                <Button size="sm" onClick={() => resetGrid('empty')}>Reset</Button>
                <PatternSelector onSelectPattern={onSelectPattern}/>
                <SetSimulationSpeedSlider onValueChange={handleChangeSpeed}/>
            </div>
            <div className="flex gap-5">
                <div>
                    <p className="text-white">Vitesse : {generationsPerSecond.toFixed(2)} générations/s</p>
                </div>
                <div>
                    <p className="text-white">Génération : {generationCount}</p>
                </div>
            </div>
        </div>
    );
};

export default ControlsPanel;
