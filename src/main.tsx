import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BoardProvider } from './contexts/BoardProvider.tsx'
import { ShipsProvider } from './contexts/ShipsProvider.tsx'
import { GameProvider } from './contexts/GameProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <BoardProvider>
        <ShipsProvider>
          <App />
        </ShipsProvider>
      </BoardProvider>
    </GameProvider>      
  </StrictMode>,
)
