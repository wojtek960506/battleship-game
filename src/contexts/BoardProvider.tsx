import { createContext, ReactNode, useContext, useState } from "react";
import { BoardElement, BoardType } from "../types/BoardTypes";
import { useGame } from "./GameProvider";
import { ShipDirection } from "../types/ShipTypes";


const DEFAULT_BOARD_LENGTH = 10;

type BoardContextType = {
  board: BoardType;
  handleSetBoard: (board: BoardType) => void;
  boardLength: number;
  handleSetBoardLength: (boardLength: number) => void;
  checkShipFitOnBoard: (row: number, column: number) => boolean;
  showShipOnBoard: (row: number, column: number) => void;
  hideShipOnBoard: (row: number, column: number) => void;
}

type BoardProviderProps = {
  children: ReactNode;
}

const BoardContext = createContext<BoardContextType>({} as BoardContextType);

export const useBoard = () => {
  return useContext(BoardContext)
}

const initialBoard = () => {
  const tmpBoard: BoardType = []

  for (let i = 0; i < DEFAULT_BOARD_LENGTH ; i++) {
    const boardRow = []
    
    for (let j = 0; j < DEFAULT_BOARD_LENGTH ; j++) {
      boardRow.push(BoardElement.EMPTY)
    }
    tmpBoard.push(boardRow);
  }
  return tmpBoard;
}

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const { chosenShip } = useGame();
  const [boardLength, setBoardLength] = useState(DEFAULT_BOARD_LENGTH)
  const [board, setBoard] = useState<BoardType>(initialBoard);

  const handleSetBoard = (board: BoardType) => { setBoard(board) }

  const handleSetBoardLength = (boardLength: number) => {
    setBoardLength(boardLength);
  }

  const checkShipFitOnBoard = (row: number, column: number): boolean => {
    if (!chosenShip) return false

    if (chosenShip.direction === ShipDirection.VERTICAL) {
      return row + chosenShip.length <= DEFAULT_BOARD_LENGTH
    } else {
      return column + chosenShip.length <= DEFAULT_BOARD_LENGTH
    }

    // not allow being to close to other ships
    // TODO add later
  }

  const showShipOnBoard = (row: number, column: number) => {
    if (!chosenShip || !chosenShip.direction) return
    
    for (let i = 0; i < chosenShip.length; i++) {
      if (chosenShip.direction === ShipDirection.HORIZONTAL) {
        const element = i === 0
          ? BoardElement.TMP_LEFT : (
            i === chosenShip.length - 1
              ? BoardElement.TMP_RIGHT
              : BoardElement.SHIP_HORIZONTAL
          )
        board[row][column + i] = element;
      } else {
        board[row + i][column] = BoardElement.SHIP_VERTICAL;
      }
    }
    // deep copy of the array has to be done to make changes in state
    setBoard(JSON.parse(JSON.stringify(board)))
  }

  const hideShipOnBoard = (row: number, column: number) => {
    if (!chosenShip || !chosenShip.direction) return
    
    for (let i = 0; i < chosenShip.length; i++) {
      if (chosenShip.direction === ShipDirection.HORIZONTAL) {
        board[row][column + i] = BoardElement.EMPTY;
      } else {
        board[row + i][column] = BoardElement.EMPTY;
      }
    }
    // deep copy of the array has to be done to make changes in state
    setBoard(JSON.parse(JSON.stringify(board)))
  }



  const value: BoardContextType = {
    board,
    handleSetBoard,
    boardLength,
    handleSetBoardLength,
    checkShipFitOnBoard,
    showShipOnBoard,
    hideShipOnBoard,
  }

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  )
}
