import { createContext, ReactNode, useContext, useState } from "react";
import { GameState } from "../types/GameTypes";
import { ShipType } from "../types/ShipTypes";


type GameContextType = {
  gameState: GameState,
  handleSetGameState: (gameState: GameState) => void,
  chosenShip?: ShipType,
  chooseShip: (chosenShip: ShipType | undefined) => void,
}

type GameProviderProps = {
  children: ReactNode
}

const GameContext = createContext<GameContextType>({} as GameContextType)

export const useGame = () => {
  return useContext(GameContext)
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [gameState, setGameState] = useState(GameState.SETTING_SHIPS_NO_CHOSEN)
  const [chosenShip, setChosenShip] = useState<ShipType | undefined>(undefined)

  const handleSetGameState = (gameState: GameState) => {
    setGameState(gameState)
  }

  const chooseShip = (chosenShip: ShipType | undefined) => {
    setChosenShip(chosenShip)
  }

  const value: GameContextType = {
    gameState,
    handleSetGameState,
    chosenShip,
    chooseShip,
  }

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  )
}
