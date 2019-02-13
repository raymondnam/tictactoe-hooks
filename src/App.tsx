import React from 'react';
import Cell from './components/Cell';
import useGameReducer from './hooks/useGameReducer';

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
          <button onClick={startNewGame}>restart</button>
        </div>
      )}
    </div>
  )
}
