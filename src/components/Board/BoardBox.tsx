
import { BoardFieldType, BoardValue } from "../../types/BoardTypes";
import { useGame } from "../../contexts/GameProvider";
import { GameState } from "../../types/GameTypes";
import { useBoard } from "../../contexts/BoardProvider";
import { useShips } from "../../contexts/ShipsProvider";

type BoardBoxProps = {
  boardField: BoardFieldType;
}

export const BoardBox = ({ boardField }: BoardBoxProps) => {
  const { value, row, column } = boardField;
  const { gameState, handleSetGameState } = useGame()
  const { 
    checkShipFitOnBoard, showShipOnBoard, hideShipOnBoard
  } = useBoard()
  const { setChosenShip } = useShips()

  let elementColor;

  switch (value) {
    case BoardValue.HIT:
      elementColor = 'hit'
      break;
    case BoardValue.MISSED:
      elementColor = 'missed'
      break;

    case BoardValue.HORIZONTAL_MIDDLE:
      elementColor = 'ship-horizontal'
      break;
    case BoardValue.HORIZONTAL_LEFT:
      elementColor = 'ship-horizontal-left'
      break
    case BoardValue.HORIZONTAL_RIGHT:
      elementColor = 'ship-horizontal-right'
      break
    
    case BoardValue.VERTICAL_MIDDLE:
      elementColor = 'ship-vertical'
      break;
    case BoardValue.VERTICAL_TOP:
      elementColor = 'ship-vertical-top'
      break
    case BoardValue.VERTICAL_BOTTOM:
      elementColor = 'ship-vertical-bottom'
      break
    
    case BoardValue.EMPTY:
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
