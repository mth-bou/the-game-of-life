import React, { useCallback } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patterns } from "@/lib/patterns";

type PatternSelectorProps = {
    onSelectPattern: (selectedKey: string) => void;
};

const PatternSelector = ({ onSelectPattern }: PatternSelectorProps) => {

    const handleSelectPattern = useCallback((value: string) => {
        onSelectPattern(value);
    }, [onSelectPattern]);

    return (
        <Select onValueChange={handleSelectPattern}>
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select a pattern"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Object.keys(patterns).map(key => (
                        <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default PatternSelector;
