import './App.css'
import { BoardContainer } from './components/Board/BoardContainer'
import { ShipsSetter } from './components/Ship/ShipsSetter'
import { useShips } from './contexts/ShipsProvider'

function App() {

  const { areAllShipsSet } = useShips()

  return (
    <div style={{display: 'flex'}}>
      {!areAllShipsSet() && <ShipsSetter />}     
      <BoardContainer />
    </div>
  )
}

export default App
