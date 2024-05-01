import React, { useCallback } from "react";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPatterns } from "@/lib/patterns";

type PatternSelectorProps = {
    onSelectPattern: (selectedKey: string) => void;
};

const PatternSelector = ({ onSelectPattern }: PatternSelectorProps) => {

    const patterns = getPatterns();

    const handleSelectPattern = useCallback((value: string) => {
        onSelectPattern(value);
    }, [onSelectPattern]);

    return (
        <Select onValueChange={handleSelectPattern}>
            <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select a pattern"/>
            </SelectTrigger>
            <SelectContent>
                {Object.entries(patterns).map(([category, categoryPatterns]) => (
                    <SelectGroup key={category.charAt(0).toUpperCase() + category.slice(1)}>
                        <SelectLabel>{category}</SelectLabel>
                        {Object.keys(categoryPatterns).map(key => (
                            <SelectItem key={key} value={key}>{key}</SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    )
}

export default PatternSelector;
