import React from 'react';
import {cn} from "@/lib/utils";
import { Slider as BaseSlider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof BaseSlider>

interface SetSimulationSpeedSliderProps extends SliderProps {
    onValueChange: (value: number[]) => void;
}

const SetSimulationSpeedSlider = ({ onValueChange, className, ...props }: SetSimulationSpeedSliderProps) => {

    const handleChange = (value: number[]) => {
        onValueChange(value);
    };

    return (
        <BaseSlider
            defaultValue={[0]} // Démarre à 1 gén/sec, donc slider à 0
            max={100} step={1}
            onValueChange={handleChange}
            className={cn("w-[200px]", className)}
            {...props}
        />
    );
};

export default SetSimulationSpeedSlider;
