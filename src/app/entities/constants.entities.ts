export enum ALLOWED_MOVES {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
}

export enum ARROW_KEY_CODES {
  UP_ARROW = 'ArrowUp',
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  DOWN_ARROW = 'ArrowDown',
}

export const BOARD_COLUMNS = 4;
export const BOARD_ROWS = 4;

export const COLOR_CODES = new Map([
  [2048, 'rgba(183,28,28, .5)'],
  [1024, 'rgba(106,27,154, .5)'],
  [512, 'rgba(255,87,34, .5)'],
  [256, 'rgba(250,154,130, .5)'],
  [128, 'rgba(67,160,71, .5)'],
  [64, 'rgba(38,166,154, .8)'],
  [32, 'rgba(0,191,165, .5)'],
  [16, 'rgba(244,143,177, .5)'],
  [8, 'rgba(129,199,132, .5)'],
  [4, 'rgba(156,214,205, 1)'],
  [2, 'rgba(178,235,242, 1)'],
]);
