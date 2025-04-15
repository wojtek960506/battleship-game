export enum BoardValue {
  EMPTY = 'O',
  MISSED = '*',
  HIT = 'X',
  VERTICAL_TOP = 'T',
  VERTICAL_BOTTOM = 'B',
  VERTICAL_MIDDLE = '|',
  HORIZONTAL_MIDDLE = '=',
  HORIZONTAL_LEFT = 'L',
  HORIZONTAL_RIGHT = 'R'
}

export type BoardFieldType = {
  value: BoardValue,
  hasShip: boolean,
  isSet: boolean,
  row: number,
  column: number,
}

export type BoardRowType = BoardFieldType[]

export type BoardType = BoardRowType[];

