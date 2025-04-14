import { createContext, ReactNode, useContext, useState } from "react";
import { GameState } from "../types/GameTypes";


type GameContextType = {
  gameState: GameState,
  handleSetGameState: (gameState: GameState) => void,
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

  const handleSetGameState = (gameState: GameState) => {
    setGameState(gameState)
  }

  const value: GameContextType = {
    gameState,
    handleSetGameState
  }

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  )
}
