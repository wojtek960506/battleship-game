import React from "react";
import { useShips } from "../../contexts/ShipsProvider";
import { Ship } from "./Ship";
import "./Ship.css"

export const ShipsSetter = () => {
  const { ships } = useShips()
  
  return (
    <div>
      <h2 className="ships-setter-title">Set ships</h2>
      {ships.map(ship => <Ship key={ship.id} ship={ship} />)}
      <button >Set Ships</button>
    </div>
  )
}
