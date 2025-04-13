import React from "react";
import { BoardElement } from "../../types/BoardTypes";

type BoardBoxProps = {
  element: BoardElement;
  row: number;
  column: number;
}

export const BoardBox = ({ element, row, column }: BoardBoxProps) => {
  
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

  return (
    <div 
      className='board-element'
      onClick={(e) => {
        console.log(`click board element row=${row} column=${column}`);
      }}  
    >
      

      {elementColor &&
        <div
          className={`${elementColor}`}
          // style={{height: `${5 * 40 - 2 * 5}px`}}
          // style={getStyles(5)}
        />
      }
    </div>
  )
}
