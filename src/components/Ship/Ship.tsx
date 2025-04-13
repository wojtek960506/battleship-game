import React from "react";
import { ShipDirection, ShipType } from "../../types/ShipTypes";
import './Ship.css'

type ShipProps = {
  ship: ShipType
}

export const Ship = ({ ship }: ShipProps) => {
  const { id, startingPosition, length, direction, isSet } = ship;

  
  const getStyles = (num: number) => {
    return { [direction === ShipDirection.HORIZONTAL ? 'width' : 'height']: `${num * 40 - 2 * 5}px` }
  }


  return (
    <div className="ship" style={getStyles(length)} />
  )
}
