import { createContext, ReactNode, useContext, useState } from "react";
import { ShipDirection, Ships, ShipType } from "../types/ShipTypes";
import { useGame } from "./GameProvider";

const DEFAULT_SHIP_LENGTHS = [5, 4, 3, 3, 2]


type ShipsContextType = {
  ships: Ships,
  handleSetShips: (ships: Ships) => void,
  areAllShipsSet: () => boolean,
  shipsDirection: ShipDirection,
  changeShipsDirection: (shipsDirection: ShipDirection) => void,
  setChosenShip: (row: number, column: number) => void;
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
  const [shipsDirection, setShipsDirection] = useState<ShipDirection>(ShipDirection.HORIZONTAL)
  const { chosenShip, chooseShip } = useGame()

  const areAllShipsSet = () => ships.every(ship => ship.isSet)

  const handleSetShips = (ships: Ships) => setShips(ships);

  const changeShipsDirection = (shipsDirection: ShipDirection) => {
    setShipsDirection(shipsDirection)
    setShips(prevShips => {
      prevShips.forEach(ship => {
        if (!ship.isSet) ship.direction = shipsDirection
      })
      return prevShips
    })
  }

  const setChosenShip = (row: number, column: number) => {
    const nextShips = ships.map(s => {
      if (s.id === chosenShip?.id) {
        return {
          ...chosenShip,
          isSet: true,
          startingPosition: { row, column }
        }
      } else {
        return s
      }
    })
    setShips(nextShips)
    chooseShip(undefined)
  }

  const value: ShipsContextType = {
    ships,
    handleSetShips,
    areAllShipsSet,
    shipsDirection,
    changeShipsDirection,
    setChosenShip,
  } 

  return (
    <ShipsContext.Provider value={value}>{children}</ShipsContext.Provider>
  )
}