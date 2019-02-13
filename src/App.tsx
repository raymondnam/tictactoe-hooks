import React from 'react';
import Cell from './components/Cell';
import useGameReducer from './hooks/useGameReducer';
import { getEmoji } from './utils/emoji';

export default function App(props) {
  const [state, dispatch] = useGameReducer();
  const { gameGrid, currentPlayer, winner, isDraw } = state;

  function handleClick(currentValue: string, x: number, y: number) {
    dispatch({ type: 'PLAYER_MOVE', x, y });
  }

  function startNewGame() {
    dispatch({ type: 'START_NEW_GAME' })
  }

  return (
    <div className="game-container">
      <h1 className="game-title">TIC TAC TOE</h1>
      <h2 className="game-subtitle">with React Hooks</h2>
      <div className="game-grid">
        {gameGrid.map((row, i) => (
          <div
            className="game-row"
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
        Current player: {getEmoji(currentPlayer)}
      </div>
      {winner && <strong>Winner: {getEmoji(winner)}</strong>}
      {isDraw && <strong>DRAW!</strong>}
      {(isDraw || winner) && (
        <div>
          <button onClick={startNewGame}>restart</button>
        </div>
      )}
    </div>
  )
}
