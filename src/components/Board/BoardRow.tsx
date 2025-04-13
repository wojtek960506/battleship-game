import React from "react";
import { BoardElement } from "../../types/BoardTypes";
import { BoardBox } from "./BoardBox";

type BoardRowProps = {
  data: BoardElement[],
  row: number
}

export const BoardRow = ({ data, row }: BoardRowProps) => {
  return (
    <div className='board-row'>
      {data.map(
        (element, index) => <BoardBox key={index} element={element} row={row} column={index} />
      )}
    </div>
  )
}
