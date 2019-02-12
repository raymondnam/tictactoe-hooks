import React from 'react';

export default function Cell(props: any) {
  const { value, onClick } = props;
  return (
    <div
      className={`square square--${value}`}
      style={{
        border: "1px solid black",
        height: 40,
        width: 40,
        textAlign: "center"
      }}
      onClick={onClick}
    >
      {value}
    </div>
  );
}
