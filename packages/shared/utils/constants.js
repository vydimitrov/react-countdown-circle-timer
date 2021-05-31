export const DIRECTIONS = {
  HORIZONTAL: 'horizontal',
  HORIZONTAL_INVERSE: 'horizontal-inverse',
  VERTICAL: 'vertical',
  VERTICAL_INVERSE: 'vertical-inverse',
}

export const DIRECTION_VALUES = {
  [DIRECTIONS.HORIZONTAL]: {
    x1: 1,
    y1: 0,
    x2: 0,
    y2: 0,
  },
  [DIRECTIONS.HORIZONTAL_INVERSE]: {
    x1: 0,
    y1: 0,
    x2: 1,
    y2: 0,
  },
  [DIRECTIONS.VERTICAL]: {
    x1: 0,
    y1: 1,
    x2: 0,
    y2: 0,
  },
  [DIRECTIONS.VERTICAL_INVERSE]: {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 1,
  },
}
