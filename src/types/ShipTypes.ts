export enum ShipDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export type ShipPosition = {
  row: number,
  column: number
}

export type ShipType = {
  id: number,
  startingPosition?: ShipPosition,
  length: number,
  direction?: ShipDirection,
  isSet: boolean
}

export type Ships = ShipType[]

