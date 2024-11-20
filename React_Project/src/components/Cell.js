import React from 'react';
import './Cell.css';

function Cell({ data, onClick }) {
    const { revealed, mine, adjacentMines } = data;

    return (
        <button
            className={`cell ${revealed ? 'revealed' : ''} ${mine ? 'mine' : ''}`}
            onClick={onClick}
        >
            {revealed ? (mine ? 'X' : adjacentMines) : ''}
        </button>
    );
}

export default Cell;
