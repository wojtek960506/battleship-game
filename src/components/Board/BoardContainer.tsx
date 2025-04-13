import React from "react";
import { BoardLetters } from "./BoardLetters";
import { BoardNumbers } from "./BoardNumbers";
import { Board } from "./Board";


export const BoardContainer = () => {
  return (
    <div className="board-container">
      <BoardNumbers />
      <div className="board-inner-container">
        <BoardLetters />
        <Board />
      </div>
    </div>
  )
}
