import { reducer, getInitialState } from '../../src/reducers/gameReducer';

describe('Tests for gameReducer', () => {
  describe('State updates for "PLAYER_MOVE"', () => {
    it('should update gameGrid with correct value', () => {
      const state = {
        ...getInitialState(),
        currentPlayer: 'O',
      };
      expect(reducer(state, { type: 'PLAYER_MOVE', x: 0, y: 2 }).gameGrid[0][2]).toBe('O');
    });

    it('should update the current player with the next one', () => {
      const state = {
        ...getInitialState(),
        currentPlayer: 'O',
      };
      expect(reducer(state, { type: 'PLAYER_MOVE', x: 0, y: 2 }).currentPlayer).toBe('X');
    });

    it('should not update the grid if the cell is not empty', () => {
      const state = {
        ...getInitialState(),
        currentPlayer: 'O',
        gameGrid: [
          ['X', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      };
      expect(reducer(state, { type: 'PLAYER_MOVE', x: 0, y: 0 }).gameGrid[0][0]).toBe('X');
    });

    it('should increment "playCount"', () => {
      const state = {
        ...getInitialState(),
        playCount: 2,
      };
      expect(reducer(state, { type: 'PLAYER_MOVE', x: 0, y: 2 }).playCount).toBe(3);
    });

    it('should update isDraw to "true"', () => {
      const state = {
        ...getInitialState(),
        playCount: 8,
      };
      expect(reducer(state, { type: 'PLAYER_MOVE', x: 0, y: 2 }).isDraw).toBe(true);
    });
  });

  describe('Winning conditions after "PLAYER_MOVE"', () => {
    it('should be able to horizontally win', () => {
      const state = {
        ...getInitialState(),
        gameGrid: [
          ['X', 'X', ''],
          ['', 'O', ''],
          ['', '', 'O'],
        ],
        currentPlayer: 'X',
      };
      expect(reducer(state, { type: 'PLAYER_MOVE', x: 0, y: 2 }).winner).toBe('X');
    });

    it('should be a to vertically win', () => {
      const state = {
        ...getInitialState(),
        gameGrid: [
          ['X', '', ''],
          ['X', 'O', ''],
          ['', '', 'O'],
        ],
        currentPlayer: 'X',
      };
      expect(reducer(state, { type: 'PLAYER_MOVE', x: 2, y: 0 }).winner).toBe('X');
    });

    it('should be a to diagonally win (top-left)', () => {
      const state = {
        ...getInitialState(),
        gameGrid: [
          ['X', '', ''],
          ['O', 'X', 'O'],
          ['', '', ''],
        ],
        currentPlayer: 'X',
      };
      expect(reducer(state, { type: 'PLAYER_MOVE', x: 2, y: 2 }).winner).toBe('X');
    });

    it('should be a to diagonally win (bottom-right)', () => {
      const state = {
        ...getInitialState(),
        gameGrid: [
          ['', '', ''],
          ['O', 'X', 'O'],
          ['X', '', ''],
        ],
        currentPlayer: 'X',
      };
      expect(reducer(state, { type: 'PLAYER_MOVE', x: 0, y: 2 }).winner).toBe('X');
    });
  });

  describe('State updates for "START_NEW_GAME"', () => {
    it('should be able to start a new game with a clean state', () => {
      const state = {
        ...getInitialState(),
        gameGrid: [
          ['X', 'X', ''],
          ['', 'O', ''],
          ['', '', 'O'],
        ],
        currentPlayer: 'O',
      };
      expect(reducer(state, { type: 'START_NEW_GAME' })).toEqual(getInitialState());
    });
  });
});
