import React from 'react';
import { getEmoji } from '../utils/emoji';

interface CellProps {
  value: string
  onClick: () => void,
};

export default function Cell(props: CellProps) {
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
