import { ALLOWED_MOVES, BOARD_COLUMNS, BOARD_ROWS } from './constants.entities';
import { Tile } from './tile.entities';

export class Board {
  columns: number = BOARD_COLUMNS;
  rows: number = BOARD_ROWS;
  tiles: Tile[][];
  score: number;

  constructor() {}

  new(): void {
    this.score = 0;
    this.tiles = [...Array(this.rows)].map((x) => Array(this.columns).fill(null));
    this.generateNewTiles();
  }

  public generateNewTiles(): void {
    this.generateRandomTile();
    this.generateRandomTile();
  }

  private generateRandomTile(): void {
    const emptyPositions = [];
    for (let i = 0; i < this.tiles.length; i += 1) {
      const row = this.tiles[i];
      for (let j = 0; j < row.length; j += 1) {
        const column = row[j];
        if (column == null) {
          emptyPositions.push({ row: i, col: j });
        }
      }
    }
    if (!!emptyPositions && emptyPositions.length >= 2) {
      const randomEmptyPosition = this.randomIntFromInterval(0, emptyPositions.length - 1);
      const randomRow = emptyPositions[randomEmptyPosition].row;
      const randomCol = emptyPositions[randomEmptyPosition].col;
      const newTileVal = this.randomTileValue();
      const newTilePos = { row: randomRow, col: randomCol };
      this.tiles[randomRow][randomCol] = new Tile(newTileVal, newTilePos);
    } else {
      // Game Over
      console.log('GAME OVER');
    }
  }

  private randomIntFromInterval(min, max): number {
    let result = Math.floor(Math.random() * (max - min + 1) + min);
    if (result < min) {
      result = min;
    } else if (result > max) {
      result = max;
    }
    return result;
  }

  private randomTileValue(): number {
    return Math.random() < 0.5 ? 2 : 4;
  }

  public moveTiles(direction: string): void {
    /*

    TODO:

    Animacion al moverse ?
    Mensaje de victoria y derrota

    */
    switch (direction) {
      case ALLOWED_MOVES.UP:
        this.moveTilesTop();
        this.mergeTilesTop();
        break;
      case ALLOWED_MOVES.RIGHT:
        this.moveTilesRight();
        this.mergeTilesRight();
        break;
      case ALLOWED_MOVES.DOWN:
        this.moveTilesDown();
        this.mergeTilesDown();
        break;
      case ALLOWED_MOVES.LEFT:
        this.moveTilesLeft();
        this.mergeTilesLeft();
        break;
    }
  }

  private moveTilesTop(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      let spaceCounter = 0;
      for (let j = 0; j < this.tiles[i].length; j += 1) {
        const tile = this.tiles[j][i];
        if (tile == null) {
          spaceCounter += 1;
        } else {
          this.tiles[j - spaceCounter][i] = { ...tile };
          if (spaceCounter > 0) {
            this.tiles[j][i] = null;
          }
        }
      }
    }
  }

  private mergeTilesTop(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      for (let j = 0; j < this.tiles[i].length; j += 1) {
        const tile = this.tiles[j][i];
        if (!!tile && !!this.tiles[j + 1] && !!this.tiles[j + 1][i] && tile.value === this.tiles[j + 1][i].value) {
          this.tiles[j][i].value = tile.value * 2;
          this.addScore(this.tiles[j][i].value);
          this.tiles[j + 1][i] = null;
          this.moveTilesTop();
        }
      }
    }
  }

  private moveTilesDown(): void {
    for (let i = this.tiles.length - 1; i >= 0; i -= 1) {
      let spaceCounter = 0;
      for (let j = this.tiles[i].length - 1; j >= 0; j -= 1) {
        const tile = this.tiles[j][i];
        if (tile == null) {
          spaceCounter += 1;
        } else {
          this.tiles[j + spaceCounter][i] = { ...tile };
          if (spaceCounter > 0) {
            this.tiles[j][i] = null;
          }
        }
      }
    }
  }

  private mergeTilesDown(): void {
    for (let i = this.tiles.length - 1; i >= 0; i -= 1) {
      for (let j = this.tiles[i].length - 1; j >= 0; j -= 1) {
        const tile = this.tiles[j][i];
        if (!!tile && !!this.tiles[j - 1] && !!this.tiles[j - 1][i] && tile.value === this.tiles[j - 1][i].value) {
          this.tiles[j][i].value = tile.value * 2;
          this.addScore(this.tiles[j][i].value);
          this.tiles[j - 1][i] = null;
          this.moveTilesDown();
        }
      }
    }
  }

  private moveTilesRight(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      let spaceCounter = 0;
      for (let j = this.tiles[i].length - 1; j >= 0; j -= 1) {
        const tile = this.tiles[i][j];
        if (tile == null) {
          spaceCounter += 1;
        } else {
          this.tiles[i][j + spaceCounter] = { ...tile };
          if (spaceCounter > 0) {
            this.tiles[i][j] = null;
          }
        }
      }
    }
  }

  private mergeTilesRight(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      for (let j = this.tiles[i].length - 1; j >= 0; j -= 1) {
        const tile = this.tiles[i][j];
        if (!!tile && !!this.tiles[i][j - 1] && tile.value === this.tiles[i][j - 1].value) {
          this.tiles[i][j].value = tile.value * 2;
          this.addScore(this.tiles[i][j].value);
          this.tiles[i][j - 1] = null;
          this.moveTilesRight();
        }
      }
    }
  }

  private moveTilesLeft(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      let spaceCounter = 0;
      for (let j = 0; j < this.tiles[i].length; j += 1) {
        const tile = this.tiles[i][j];
        if (tile == null) {
          spaceCounter += 1;
        } else {
          this.tiles[i][j - spaceCounter] = { ...tile };
          if (spaceCounter > 0) {
            this.tiles[i][j] = null;
          }
        }
      }
    }
  }

  private mergeTilesLeft(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      for (let j = 0; j < this.tiles[i].length; j += 1) {
        const tile = this.tiles[i][j];
        if (!!tile && !!this.tiles[i][j + 1] && tile.value === this.tiles[i][j + 1].value) {
          this.tiles[i][j].value = tile.value * 2;
          this.addScore(this.tiles[i][j].value);
          this.tiles[i][j + 1] = null;
          this.moveTilesLeft();
        }
      }
    }
  }

  private addScore(acum: number): void {
    this.score += acum;
  }
}
