import { useBoard } from "../../contexts/BoardProvider";
import { BoardRow } from "./BoardRow";


export const Board = () => {
  const { board } = useBoard();
  
  return (
    <div className="board">
      {board.map(
        (boardRow, i) => (
          <BoardRow key={`board-row-${i}`} boardRow={boardRow} rowNumber={i} />
        )
      )}

    </div>
  )
}
