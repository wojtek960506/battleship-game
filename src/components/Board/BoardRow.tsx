import { BoardRowType } from "../../types/BoardTypes";
import { BoardBox } from "./BoardBox";

type BoardRowProps = {
  boardRow: BoardRowType,
  rowNumber: number
}

export const BoardRow = ({ boardRow, rowNumber }: BoardRowProps) => {

  return (
    <div className='board-row'>
      {boardRow.map(
        (boardField, index) => (
        <BoardBox key={`board-box-${rowNumber}-${index}`} boardField={boardField} />
      )
      )}
    </div>
  )
}
