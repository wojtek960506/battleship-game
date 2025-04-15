
import { BoardElement } from "../../types/BoardTypes";
import { useGame } from "../../contexts/GameProvider";
import { GameState } from "../../types/GameTypes";
import { useBoard } from "../../contexts/BoardProvider";
import { useShips } from "../../contexts/ShipsProvider";

type BoardBoxProps = {
  element: BoardElement;
  row: number;
  column: number;
}

export const BoardBox = ({ element, row, column }: BoardBoxProps) => {
  const { gameState, handleSetGameState } = useGame()
  const { 
    checkShipFitOnBoard, showShipOnBoard, hideShipOnBoard, isInsideSetShip
  } = useBoard()
  const { setChosenShip } = useShips()
  
  let elementColor;

  switch (element) {
    case BoardElement.HIT:
      elementColor = 'hit'
      break;
    case BoardElement.MISSED:
      elementColor = 'missed'
      break;

    case BoardElement.SHIP_HORIZONTAL:
      elementColor = 'ship-horizontal'
      break;
    case BoardElement.TMP_LEFT:
      elementColor = 'ship-horizontal-left'
      break
    case BoardElement.TMP_RIGHT:
      elementColor = 'ship-horizontal-right'
      break
    
    case BoardElement.SHIP_VERTICAL:
      elementColor = 'ship-vertical'
      break;
    case BoardElement.TMP_TOP:
      elementColor = 'ship-vertical-top'
      break
    case BoardElement.TMP_BOTTOM:
      elementColor = 'ship-vertical-bottom'
      break
    
    case BoardElement.EMPTY:
    default:
      break;
  }

  const handleBoardBoxMouseEnter = () => {
    // for now handle board clicks when setting ships
    if (gameState === GameState.SETTING_SHIPS_NO_CHOSEN) return;

    if (gameState === GameState.SETTING_SHIPS_ONE_CHOSEN) {
      if (!checkShipFitOnBoard(row, column)) return
      showShipOnBoard(row, column)
    }
  }

  const handleBoardBoxMouseLeave = () => {
    // for now handle board clicks when setting ships
    if (gameState === GameState.SETTING_SHIPS_NO_CHOSEN) return;

    if (gameState === GameState.SETTING_SHIPS_ONE_CHOSEN) {
      // if (!checkShipFitOnBoard(row, column)) return
      // if (!isInsideSetShip) hideShipOnBoard(row, column)
      hideShipOnBoard(row, column)
    }
  }

  const handleBoardBoxOnClick = () => {
    //
    if (gameState === GameState.SETTING_SHIPS_NO_CHOSEN) return;

    if (gameState === GameState.SETTING_SHIPS_ONE_CHOSEN) {
      // if (!checkShipFitOnBoard(row, column)) return
      // showShipOnBoard(row, column)
      handleSetGameState(GameState.SETTING_SHIPS_NO_CHOSEN)
      setChosenShip(row, column)
      
    }
  }

  return (
    <button 
      className='board-element'
      onMouseEnter={handleBoardBoxMouseEnter}
      onMouseLeave={handleBoardBoxMouseLeave}
      onClick={handleBoardBoxOnClick}
    >
      {elementColor &&
        <div className={`${elementColor}`} />
      }
    </button>
  )
}
