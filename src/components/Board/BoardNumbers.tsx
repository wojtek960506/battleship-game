import React from "react";
import { useBoard } from "../../contexts/BoardProvider";
import './Board.css'

export const BoardNumbers = () => {
  const { boardLength } = useBoard();

  const numbers = Array(boardLength).fill("")
    .map((_, index) => (1 + index).toString())

  // empty corner of the board
  numbers.unshift("")

  return (
    <div className="board-numbers">
      {numbers.map(
        (number, i) => <div key={i} className="board-info">{number}</div>
      )}
    </div>
  )
}
