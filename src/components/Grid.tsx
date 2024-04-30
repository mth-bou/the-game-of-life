import React, {useEffect, useState} from 'react';
import "@/components/Grid.css";

interface GridProps {
    grid: boolean[][];
}

const Grid = ({grid}: GridProps) => {
    const [cellSize, setCellSize] =
        useState<{ width: number, height: number }>({width: 20, height: 20});

    useEffect(() => {
        const updateSize = () => {
            const numCols = grid[0].length;
            const numRows = grid.length;
            const width = window.innerWidth / numCols;
            const height = window.innerHeight / numRows;
            setCellSize({width, height});
        }

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => {
            window.removeEventListener('resize', updateSize);
        }

    }, [grid]);

    return (
        <div className="grid" style={{
            gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize.width}px)`,
            gridTemplateRows: `repeat(${grid.length}, ${cellSize.height}px)`
        }}>
            {grid.map((row, i) => (
                row.map((cell, j) => (
                    <div
                        key={`${i}-${j}`}
                        className={`cell ${cell ? 'alive' : ''}`}
                        style={{width: cellSize.width, height: cellSize.height}}>
                    </div>
                ))
            ))
            }
        </div>
    );
};

export default Grid;
