import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BoardProvider } from './contexts/BoardProvider.tsx'
import { ShipsProvider } from './contexts/ShipsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BoardProvider>
      <ShipsProvider>
        <App />
      </ShipsProvider>
    </BoardProvider>
      
  </StrictMode>,
)
