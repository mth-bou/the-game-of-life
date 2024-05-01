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
            defaultValue={[33]}
            max={100} step={1}
            onValueChange={handleChange}
            className={cn("w-[50%]", className)}
            {...props}
        />
    );
};

export default SetSimulationSpeedSlider;
