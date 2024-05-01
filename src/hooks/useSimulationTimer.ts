import { useEffect, useState } from "react";

const useSimulationTimer = (callback: Function, intervalMs: number) => {
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (running) {
            const id = setInterval(callback, intervalMs);
            return () => clearInterval(id);
        }
    }, [running, intervalMs, callback]);

    return { running, setRunning };
}

export default useSimulationTimer;
