export enum BoardElement {
  EMPTY = 'O',
  MISSED = '*',
  HIT = 'X',
  SHIP_HORIZONTAL = '=',
  TMP_TOP = 'T',
  TMP_BOTTOM = 'B',
  SHIP_VERTICAL = '|',
  TMP_LEFT = 'L',
  TMP_RIGHT = 'R'
}

export type BoardType = Array<Array<BoardElement>>;