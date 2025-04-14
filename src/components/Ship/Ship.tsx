// import React, { MouseEvent } from "react";
import { ShipDirection, ShipType } from "../../types/ShipTypes";
import './Ship.css'
import { useGame } from "../../contexts/GameProvider";
import { GameState } from "../../types/GameTypes";

type ShipProps = {
  ship: ShipType
}

export const Ship = ({ ship }: ShipProps) => {
  const { id, startingPosition, length, direction, isSet } = ship;
  const { chosenShip, chooseShip, gameState, handleSetGameState } = useGame();

  const getStyles = (num: number) => {
    return { [direction === ShipDirection.HORIZONTAL ? 'width' : 'height']: `${num * 40 - 2 * 5}px` }
  }

  const handleShipClick = () => {
    if (gameState === GameState.SETTING_SHIPS_NO_CHOSEN) {
      chooseShip(ship)
      handleSetGameState(GameState.SETTING_SHIPS_ONE_CHOSEN)
    } else {
      if (chosenShip?.id !== ship.id) {
        // choosing ship while other was chosen
        chooseShip(ship)
      } else {
        chooseShip(undefined)
        handleSetGameState(GameState.SETTING_SHIPS_NO_CHOSEN)
      }
    }   
  }

  let shipClassName = "ship";
  if (chosenShip?.id === id) shipClassName += " chosen"

  return (
    <div onClick={handleShipClick} className={shipClassName} style={getStyles(length)} />
  )
}
