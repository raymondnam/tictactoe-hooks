import React, { useState } from 'react';
import Cell from './components/Cell';

const GAME_SIZE = 3;
const MAX_PLAY_COUNT = GAME_SIZE * GAME_SIZE;
let playCount = 0;

export default function App(props: object) {
  const [gameGrid, setGameGrid] = useState(getGameInitialState(GAME_SIZE));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string|null>(null);
  const [isDraw, setIsDraw] = useState(false);

  function getGameInitialState(size : number) : Array<Array<string>> {
    return new Array(size).fill(null)
      .map(() => new Array(size).fill(''));
  }

  function handleClick(currentValue: string, x: number, y: number) {
    if (!!winner || currentValue !== '') return;
    gameGrid[x][y] = currentPlayer;
    setGameGrid(gameGrid);
    playCount = playCount + 1;
    const hasWon = checkWinner({ x, y });
    if (hasWon) {
      setWinner(currentPlayer);
    } else {
      changePlayer();
      if (playCount === MAX_PLAY_COUNT) {
        setIsDraw(true);
      }
    }
  }

  function changePlayer() {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  function checkWinnerRow(x: number) : boolean {
    for (let i = 0; i < GAME_SIZE - 1; i++) {
      if (gameGrid[x][i] !== gameGrid[x][i + 1]) {
        return false;
      }
    }
    return true;
  }

  function checkWinnerColumn(y: number) : boolean {
    for (let i = 0; i < GAME_SIZE - 1; i++) {
      if (gameGrid[i][y] !== gameGrid[i + 1][y]) {
        return false;
      }
    }
    return true;
  }

  function checkWinnerDiagonalTopLeft(): boolean {
    for (let i = 0; i < GAME_SIZE - 1; i++) {
      if (gameGrid[i][i] === '' || gameGrid[i][i] !== gameGrid[i + 1][i + 1]) {
        return false;
      }
    }
    return true;
  }

  function checkWinnerDiagonalTopRight(): boolean {
    for (let i = 0, j = GAME_SIZE - 1; i < GAME_SIZE - 1; i++, j--) {
      if (gameGrid[i][j] === '' || gameGrid[i][j] !== gameGrid[i + 1][j - 1]) {
        return false;
      }
    }
    return true;
  }

  function checkWinner(lastMove: any) : boolean {
    const { x, y } = lastMove;

    return checkWinnerRow(x)
      || checkWinnerColumn(y)
      || checkWinnerDiagonalTopLeft()
      || checkWinnerDiagonalTopRight();
  }

  function startNewGame() {
    setGameGrid(getGameInitialState(GAME_SIZE));
    setWinner(null);
    setIsDraw(false);
    playCount = 0;
  }

  return (
    <div style={{ textAlign: 'center', margin: '20px auto' }} >
      <h3>Tic tac toe</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }} >
        {gameGrid.map((row, i) => (
          <div
            className="row"
            key={`row-${i}`}
          >
            {row.map((cell, j) => (
              <Cell
                value={cell}
                onClick={() => handleClick(cell, i, j)}
                key={`cell-${i}=${j}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        Current player: {currentPlayer}
      </div>
      {winner && <strong>Winner: {winner}</strong>}
      {isDraw && <strong>DRAW!</strong>}
      {(isDraw || winner) && (
        <div>
          <button onClick={() => startNewGame()}>restart</button>
        </div>
      )}
    </div>
  )
}
