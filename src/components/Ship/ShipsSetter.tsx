import React from "react";
import { useShips } from "../../contexts/ShipsProvider";
import { Ship } from "./Ship";
import "./Ship.css"

type ShipsSetterProps = {
  
}

export const ShipsSetter = () => {
  const { ships } = useShips()
  


  return (
    <div>
      <h2 className="ships-setter-title">Set ships</h2>
      {ships.map(ship => <Ship key={ship.id} ship={ship} />)}
      {/* {ships} */}
      {}
      <button >Set Ships</button>
    </div>
  )
}
