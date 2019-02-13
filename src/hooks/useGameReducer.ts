import { useReducer } from 'react';
import { reducer, getInitialState } from '../reducers/gameReducer';

export default function useGameReducer() {
  return useReducer(reducer, getInitialState());
};
