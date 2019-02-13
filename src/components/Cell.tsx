import React from 'react';
import { getEmoji } from '../utils/emoji';

export default function Cell(props: any) {
  const { value, onClick } = props;
  const displayValue = getEmoji(value);

  return (
    <div
      className="game-cell"
      onClick={onClick}
    >
      {displayValue}
    </div>
  );
}
