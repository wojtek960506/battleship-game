import { createContext, ReactNode, useContext, useState } from "react";
import { GameState } from "../types/GameTypes";


type GameContextType = {
  gameState: GameState,
  handleSetGameState: (gameState: GameState) => void,
  chosenShip?: number,
  chooseShip: (chosenShip: number | undefined) => void,
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
  const [chosenShip, setChosenShip] = useState<number | undefined>(undefined)

  const handleSetGameState = (gameState: GameState) => {
    setGameState(gameState)
  }

  const chooseShip = (chosenShip: number | undefined) => {
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
