const GAME_SIZE = 3;
const MAX_PLAY_COUNT = GAME_SIZE * GAME_SIZE;

function getGridInitialState(size : number = GAME_SIZE) : Array<Array<string>> {
  return new Array(size).fill(null)
    .map(() => new Array(size).fill(''));
}

interface GameState {
  gameGrid: Array<Array<string>>
  currentPlayer: string
  winner: string | null,
  isDraw: boolean,
  playCount: number,
};

export function getInitialState(): GameState {
  return {
    gameGrid: getGridInitialState(),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    playCount: 0,
  };
}

export function reducer(state: GameState, action: any) : GameState {
  switch (action.type) {
    case 'PLAYER_MOVE':
      if (!!state.winner || state.gameGrid[action.x][action.y] !== '')
        return state;

      const gameGrid = [...state.gameGrid];
      gameGrid[action.x][action.y] = state.currentPlayer;
      const updatedState = {
        ...state,
        gameGrid,
        playCount: state.playCount + 1,
      };

      const hasWon = checkWinner(gameGrid, { x: action.x, y: action.y });
      if (hasWon) {
        return {
          ...updatedState,
          winner: state.currentPlayer,
        };
      }

      return {
        ...updatedState,
        currentPlayer: getNextPlayer(state.currentPlayer),
        isDraw: updatedState.playCount === MAX_PLAY_COUNT,
      }
    case 'START_NEW_GAME':
      return {
        ...getInitialState(),
      };
    default:
      throw new Error();
  }
}

function checkWinnerRow(gameGrid, x: number) : boolean {
  for (let i = 0; i < gameGrid.length - 1; i++) {
    if (gameGrid[x][i] !== gameGrid[x][i + 1]) {
      return false;
    }
  }
  return true;
}

function checkWinnerColumn(gameGrid, y: number) : boolean {
  for (let i = 0; i < gameGrid.length - 1; i++) {
    if (gameGrid[i][y] !== gameGrid[i + 1][y]) {
      return false;
    }
  }
  return true;
}

function checkWinnerDiagonalTopLeft(gameGrid): boolean {
  for (let i = 0; i < gameGrid.length - 1; i++) {
    if (gameGrid[i][i] === '' || gameGrid[i][i] !== gameGrid[i + 1][i + 1]) {
      return false;
    }
  }
  return true;
}

function checkWinnerDiagonalTopRight(gameGrid): boolean {
  for (let i = 0, j = gameGrid.length - 1; i < gameGrid.length - 1; i++, j--) {
    if (gameGrid[i][j] === '' || gameGrid[i][j] !== gameGrid[i + 1][j - 1]) {
      return false;
    }
  }
  return true;
}

function checkWinner(gameGrid, lastMove) : boolean {
  const { x, y } = lastMove;
  return checkWinnerRow(gameGrid, x)
    || checkWinnerColumn(gameGrid, y)
    || checkWinnerDiagonalTopLeft(gameGrid)
    || checkWinnerDiagonalTopRight(gameGrid);
}

function getNextPlayer(currentPlayer: string) : string {
  return currentPlayer === 'X' ? 'O' : 'X';
}