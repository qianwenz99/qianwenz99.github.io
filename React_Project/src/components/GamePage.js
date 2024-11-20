import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cell from './Cell';
import './GamePage.css';

function GamePage() {
    const { difficulty } = useParams();
    const [grid, setGrid] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [firstClick, setFirstClick] = useState(true);

    const difficultyMap = {
        easy: { size: 8, mines: 10 },
        medium: { size: 16, mines: 40 },
        hard: { size: 30, mines: 99 },
    };

    const resetGame = () => {
        setGameOver(false);
        setFirstClick(true);
        const { size, mines } = difficultyMap[difficulty];
        setGrid(generateGrid(size, mines));
    };

    useEffect(() => {
        resetGame();
    }, [difficulty]);

    const generateSafeGrid = (size, mines, safeRow, safeCol) => {
        let newGrid;
        do {
            newGrid = generateGrid(size, mines);
        } while (newGrid[safeRow][safeCol].mine);
        return newGrid;
    };

    const revealCell = (row, col) => {
        if (gameOver || grid[row][col].revealed) return;

        const { size, mines } = difficultyMap[difficulty];

        if (firstClick) {
            setFirstClick(false);
            if (grid[row][col].mine) {
                const safeGrid = generateSafeGrid(size, mines, row, col);
                setGrid(safeGrid);
                return;
            }
        }

        const newGrid = [...grid];
        if (grid[row][col].mine) {
            setGameOver(true);
            alert('Game Over! You clicked a mine.');
            revealAllMines(newGrid);
        } else {
            recursiveReveal(newGrid, row, col);
        }

        setGrid(newGrid);
    };

    const revealAllMines = (newGrid) => {
        newGrid.forEach((row) =>
            row.forEach((cell) => {
                if (cell.mine) {
                    cell.revealed = true;
                }
            })
        );
    };

    const recursiveReveal = (grid, row, col) => {
        if (
            row < 0 ||
            col < 0 ||
            row >= grid.length ||
            col >= grid[0].length ||
            grid[row][col].revealed
        ) {
            return;
        }

        grid[row][col].revealed = true;

        if (grid[row][col].adjacentMines === 0) {
            for (let dr of [-1, 0, 1]) {
                for (let dc of [-1, 0, 1]) {
                    if (dr !== 0 || dc !== 0) {
                        recursiveReveal(grid, row + dr, col + dc);
                    }
                }
            }
        }
    };

    return (
        <div className="game">
            <h2>Minesweeper-{difficulty}</h2>
            <div className={`grid ${difficulty}`}>
                {grid.map((row, rowIdx) =>
                    row.map((cell, colIdx) => (
                        <Cell
                            key={`${rowIdx}-${colIdx}`}
                            data={cell}
                            onClick={() => revealCell(rowIdx, colIdx)}
                        />
                    ))
                )}
            </div>
            <button className="reset-button" onClick={resetGame}>
                Reset Game
            </button>
        </div>
    );
}

function generateGrid(size, mineCount) {
    let grid = Array(size)
        .fill()
        .map(() =>
            Array(size).fill({
                mine: false,
                revealed: false,
                flagged: false,
                adjacentMines: 0,
            })
        );

    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (!grid[row][col].mine) {
            grid[row][col] = { ...grid[row][col], mine: true };
            minesPlaced++;
        }
    }

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c].mine) continue;
            let count = 0;
            for (let dr of [-1, 0, 1]) {
                for (let dc of [-1, 0, 1]) {
                    if (
                        r + dr >= 0 &&
                        r + dr < size &&
                        c + dc >= 0 &&
                        c + dc < size &&
                        grid[r + dr][c + dc].mine
                    ) {
                        count++;
                    }
                }
            }
            grid[r][c] = { ...grid[r][c], adjacentMines: count };
        }
    }
    return grid;
}

export default GamePage;


