import React from 'react';
import './RulesPage.css';

function RulesPage() {
    return (
        <div className="rules-content">
            <h1>Game Rules</h1>
            <p>
                The objective of the Minesweeper game is to clear a rectangular grid without detonating any hidden mines. The game board consists of a grid of cells, each of which may contain a mine or be empty. The number of mines on the board is predetermined and varies depending on the difficulty level chosen by the player. Click the reset button if you want to change the locations of the mines.
            </p>
            <p>
                Players begin by clicking on cells to reveal their contents. If a mine is revealed, the game is lost. If the cell is empty, it will display a number indicating how many mines are adjacent to that cell, including diagonally. In cases where no adjacent mines exist, the cell will be blank, and all neighboring cells will be revealed automatically, helping to clear large sections of the board quickly. This game also has first move advantage, in which if you click on a bomb the first time, the board will not reveal anything. Please click on the reset button to try again.
            </p>
            <p>
                The game is won by revealing all non-mine cells, effectively identifying the safe areas on the board. A message of win or loss would both be revealed on the page.
            </p>
            <p>
                In addition, Minesweeper offers various difficulty levels, including Easy, Medium, and Hard, each with different grid sizes and numbers of mines.
            </p>
        </div>
    );
}

export default RulesPage;
