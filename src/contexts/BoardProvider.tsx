import { createContext, ReactNode, useContext, useState } from "react";
import { BoardValue, BoardFieldType, BoardRowType, BoardType } from "../types/BoardTypes";
import { useGame } from "./GameProvider";
import { ShipDirection, ShipPosition } from "../types/ShipTypes";


const DEFAULT_BOARD_LENGTH = 10;

type BoardContextType = {
  board: BoardType;
  handleSetBoard: (board: BoardType) => void;
  boardLength: number;
  handleSetBoardLength: (boardLength: number) => void;
  checkShipFitOnBoard: (row: number, column: number) => boolean;
  showShipOnBoard: (row: number, column: number) => void;
  hideShipOnBoard: (row: number, column: number) => void;
  isInsideSetShip: (row: number, column: number) => boolean;
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

  for (let row = 0; row < DEFAULT_BOARD_LENGTH ; row++) {
    const boardRow: BoardRowType = []
    
    for (let column = 0; column < DEFAULT_BOARD_LENGTH ; column++) {
      // let value = BoardValue.EMPTY;
      // if (row == 0 && column == 0) value = BoardValue.MISSED;
      
      boardRow.push({
        value: BoardValue.EMPTY,
        // value: value,
        hasShip: false,
        isSet: false,
        row,
        column: column
      } as BoardFieldType)
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

  const getRowForShip = (
    row: number, column: number, length: number, isShipRow: boolean = false
  ) => {
    const coordinates: ShipPosition[] = [];
    // we do not store coordinates of ship
    const step = isShipRow ? length + 1 : 1;
    for (let i = column - 1; i < column + length + 1 ; i+=step) {
      if (i < 0 || i >= DEFAULT_BOARD_LENGTH) continue
      coordinates.push({ row, column: i})
    }
    return coordinates;
  }

  const getColumnForShip = (
    row: number, column: number, length: number, isShipColumn: boolean = false
  ) => {
    const coordinates: ShipPosition[] = [];
    // we do not store coordinates of ship
    const step = isShipColumn ? length + 1 : 1;
    for (let i = row - 1; i < row + length + 1 ; i+=step) {
      if (i < 0 || i >= DEFAULT_BOARD_LENGTH) continue
      coordinates.push({ row: i, column})
    }
    return coordinates;
  }

  const getCoordinatesOfShip = (row: number, column: number): ShipPosition[] => {
    const { direction, length } = chosenShip!;
    const coordinates: ShipPosition[] = [];
    if (direction === ShipDirection.HORIZONTAL) {
      for (let i = column; i < column + length; i++) {
        coordinates.push({ row, column: i })
      }
    } else if (direction === ShipDirection.VERTICAL) {
      for (let i = row; i < row + length; i++) {
        coordinates.push({ row: i, column })
      }
    }
    return coordinates;
  }

  const getCoordinatesAroundShip = (row: number, column: number): ShipPosition[] => {
    
    const { direction, length } = chosenShip!;

    const coordinates: ShipPosition[] = [];

    if (direction === ShipDirection.HORIZONTAL) {
      // get row above
      if (row - 1 >= 0) coordinates.push(...getRowForShip(row - 1, column, length))

      // get ship's row  
      coordinates.push(...getRowForShip(row, column, length, true))

      // get row below ship
      if (row + 1 <= DEFAULT_BOARD_LENGTH - 1) {
        coordinates.push(...getRowForShip(row+1, column, length))
      }
    } else if (direction === ShipDirection.VERTICAL) {
      // get column on the left from ship
      if (column - 1 >= 0) coordinates.push(...getColumnForShip(row, column - 1, length))

      // get ship's column  
      coordinates.push(...getColumnForShip(row, column, length, true))

      // get column on the right from ship
      if (column + 1 <= DEFAULT_BOARD_LENGTH - 1) {
        coordinates.push(...getColumnForShip(row, column + 1, length))
      }
    }
    return coordinates
  }

  const checkShipFitOnBoard = (row: number, column: number): boolean => {
    if (!chosenShip) return false

    if (chosenShip.direction === ShipDirection.VERTICAL) {
      if (row + chosenShip.length > DEFAULT_BOARD_LENGTH) return false
    } else {
      if (column + chosenShip.length > DEFAULT_BOARD_LENGTH) return false
    }

    // not allow being to close to other ships
    const coordOfShip = getCoordinatesOfShip(row, column)
    const coordAroundShip = getCoordinatesAroundShip(row, column)

    // console.log('coordinates of ship', coordOfShip);
    // console.log('coordinates around ship', coordAroundShip);

    for (const { row, column } of coordOfShip) {
      if (board[row][column].value !== BoardValue.EMPTY) return false
    }

    for (const { row, column } of coordAroundShip) {
      if (board[row][column].value !== BoardValue.EMPTY) return false
    }

    return true;
  }

  const showShipOnBoard = (row: number, column: number) => {
    if (!chosenShip || !chosenShip.direction) return
    
    for (let i = 0; i < chosenShip.length; i++) {
      if (chosenShip.direction === ShipDirection.HORIZONTAL) {
        const boardValue = i === 0
          ? BoardValue.HORIZONTAL_LEFT : (
            i === chosenShip.length - 1
              ? BoardValue.HORIZONTAL_RIGHT
              : BoardValue.HORIZONTAL_MIDDLE
          )
        board[row][column + i].value = boardValue;
      } else {
        board[row + i][column].value = BoardValue.VERTICAL_MIDDLE;
      }
    }
    // deep copy of the array has to be done to make changes in state
    setBoard(JSON.parse(JSON.stringify(board)))
  }

  const hideShipOnBoard = (row: number, column: number) => {
    if (!chosenShip || !chosenShip.direction) return
    
    for (let i = 0; i < chosenShip.length; i++) {
      if (chosenShip.direction === ShipDirection.HORIZONTAL) {
        board[row][column + i].value = BoardValue.EMPTY;
      } else {
        board[row + i][column].value = BoardValue.EMPTY;
      }
    }
    // deep copy of the array has to be done to make changes in state
    setBoard(JSON.parse(JSON.stringify(board)))
  }

  const isInsideSetShip = (row: number, column: number) => {
    return board[row][column].value !== BoardValue.EMPTY
  }

  const value: BoardContextType = {
    board,
    handleSetBoard,
    boardLength,
    handleSetBoardLength,
    checkShipFitOnBoard,
    showShipOnBoard,
    hideShipOnBoard,
    isInsideSetShip,
  }

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  )
}
