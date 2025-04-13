import React, { createContext, ReactNode, useContext, useState } from "react";
import { BoardElement, BoardType } from "../types/BoardTypes";


const DEFAULT_BOARD_LENGTH = 10;

type BoardContextType = {
  board: BoardType;
  handleSetBoard: (board: BoardType) => void;
  boardLength: number;
  handleSetBoardLength: (boardLength: number) => void;
}

type BoardProviderProps = {
  children: ReactNode;
}

export const useBoard = () => {
  return useContext(BoardContext)
}

const BoardContext = createContext<BoardContextType>({} as BoardContextType);




export const BoardProvider = ({ children }: BoardProviderProps) => {
  
  const [boardLength, setBoardLength] = useState(DEFAULT_BOARD_LENGTH)
  const [board, setBoard] = useState<BoardType>(() => {
    const tmpBoard: BoardType = []

    for (let i = 0; i < DEFAULT_BOARD_LENGTH ; i++) {
      const boardRow = []
      
      for (let j = 0; j < DEFAULT_BOARD_LENGTH ; j++) {
        if (j == 1 && i == 0) {
          boardRow.push(BoardElement.TMP_TOP)
          continue
        }
        if (j == 1 && i == 6) {
          boardRow.push(BoardElement.TMP_BOTTOM)
          continue
        }
        if (j == 1 && i >= 1 && i <= 5) {
          boardRow.push(BoardElement.SHIP_VERTICAL)
          continue
        }

        
        if (i == 8 && j == 3) {
          boardRow.push(BoardElement.TMP_LEFT)
          continue
        }
        if (i == 8 && j == 7) {
          boardRow.push(BoardElement.TMP_RIGHT)
          continue
        }
        if (i == 8 && j >= 4 && j <= 6) {
          boardRow.push(BoardElement.SHIP_HORIZONTAL)
          continue
        }

        boardRow.push(BoardElement.EMPTY)
      }
      tmpBoard.push(boardRow);
    }
    console.log(tmpBoard)
    
    return tmpBoard;
  });

  const handleSetBoard = (board: BoardType) => { setBoard(board) }

  const handleSetBoardLength = (boardLength: number) => {
    setBoardLength(boardLength);
  }


  const value = {
    board,
    handleSetBoard,
    boardLength,
    handleSetBoardLength
  }

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  )
}
