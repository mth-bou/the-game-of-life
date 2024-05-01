import React from 'react';
import SetSimulationSpeedSlider from "@/components/SetSimulationSpeedSlider";

type SpeedControlProps = {
    onSpeedChange: (value: number[]) => void;
};

const SpeedControl = ({ onSpeedChange }: SpeedControlProps) => {
    return (
        <SetSimulationSpeedSlider onValueChange={onSpeedChange} />
    );
};

export default SpeedControl;
