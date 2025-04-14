import React from "react";
import { useShips } from "../../contexts/ShipsProvider";
import { Ship } from "./Ship";
import "./Ship.css"
import { ShipDirection } from "../../types/ShipTypes";

export const ShipsSetter = () => {
  const { ships, shipsDirection, changeShipsDirection } = useShips()
  
  const shipsClass = shipsDirection === ShipDirection.HORIZONTAL
    ? `ships-horizontally`
    : `ships-vertically`

  const handleChangeDirection = () => {
    if (shipsDirection === ShipDirection.HORIZONTAL) {
      changeShipsDirection(ShipDirection.VERTICAL)
    } else {
      changeShipsDirection(ShipDirection.HORIZONTAL)
    }
  }

  return (
    <div className="ships-setter">
      <h2 className="ships-setter-title">Set ships</h2>
      <div className={shipsClass}>
        {ships.map(ship => <Ship key={ship.id} ship={ship} />)}
      </div>
      <button
        className="ships-direction-button"
        onClick={handleChangeDirection}  
      >
        {`Ships ${shipsDirection === ShipDirection.HORIZONTAL
          ? 'Vertically'
          : 'Horizontally'}`}
      </button>
    </div>
  )
}
