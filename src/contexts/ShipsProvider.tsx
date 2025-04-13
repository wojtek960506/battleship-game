import { createContext, ReactNode, useContext, useState } from "react";
import { ShipDirection, Ships, ShipType } from "../types/ShipTypes";

const DEFAULT_SHIP_LENGTHS = [5, 4, 3, 3, 2]


type ShipsContextType = {
  ships: Ships,
  handleSetShips: (ships: Ships) => void,
  areAllShipsSet: () => boolean,
}

type ShipsProviderProps = {
  children: ReactNode;
}

const ShipsContext = createContext<ShipsContextType>({} as ShipsContextType);

export const useShips = () => {
  return useContext(ShipsContext)
}

const initialShips = () => {
  const tmpShips: Ships = [];
  for (const [index, shipLength] of DEFAULT_SHIP_LENGTHS.entries()) {
    tmpShips.push({
      id: index,
      length: shipLength,
      direction: ShipDirection.HORIZONTAL,
      isSet: false,
    })
  }
  return tmpShips
}

export const ShipsProvider = ({ children }: ShipsProviderProps) => {
  const [ships, setShips] = useState<Ships>(initialShips);

  const areAllShipsSet = () => ships.every(ship => ship.isSet)

  const handleSetShips = (ships: Ships) => setShips(ships);

  const value: ShipsContextType = {
    ships,
    handleSetShips,
    areAllShipsSet
  } 
  
  console.log(ships);

  return (
    <ShipsContext.Provider value={value}>{children}</ShipsContext.Provider>
  )
}