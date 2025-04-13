import React from "react";
import { useBoard } from "../../contexts/BoardProvider";
import './Board.css'

export const BoardLetters = () => {
  const { boardLength } = useBoard();

  const ASCII_A_INDEX = 65;

  const letters = Array(boardLength).fill("")
    .map((_, index) => String.fromCharCode(ASCII_A_INDEX + index))

  return (
    <div className="board-letters">
      {letters.map(
        (letter, i) => <div key={i} className="board-info">{letter}</div>
      )}
    </div>
  )
}
