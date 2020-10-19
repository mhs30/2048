import { ALLOWED_MOVES, ANIMATION_CLASS, BOARD_COLUMNS, BOARD_ROWS, SOUND_EFFECTS, WIN_SCORE } from './constants.entities';
import { Tile } from './tile.entities';
import { cloneDeep } from 'lodash';
export class Board {
  private columns: number = BOARD_COLUMNS;
  private rows: number = BOARD_ROWS;
  private tiles: Tile[][];
  private score: number;
  private gameOver = false;
  private soundEnabled = false;

  constructor() {}

  getTiles(): Tile[][] {
    return this.tiles;
  }
  setTiles(tiles: Tile[][]): void {
    this.tiles = tiles;
  }
  getScore(): number {
    return this.score;
  }
  setScore(score: number): void {
    this.score = score;
  }
  getGameOver(): boolean {
    return this.gameOver;
  }
  setGameOver(val: boolean): void {
    this.gameOver = val;
  }
  setSoundEnabled(val: boolean): void {
    this.soundEnabled = val;
  }
  getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  new(): void {
    this.gameOver = false;
    this.score = 0;
    this.tiles = [...Array(this.rows)].map((x) => Array(this.columns).fill(null));
    this.generateRandomTile();
    this.generateRandomTile();
    this.playSoundEffect(SOUND_EFFECTS.NEW_TILE);
  }

  public generateNewTiles(): void {
    this.generateRandomTile();
    this.playSoundEffect(SOUND_EFFECTS.NEW_TILE);
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
      this.tiles[randomRow][randomCol] = new Tile();
    } else {
      this.gameOver = true;
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

  public moveTiles(direction: string): void {
    this.setTilesNotNew();
    switch (direction) {
      case ALLOWED_MOVES.UP:
        this.moveTilesTop();
        setTimeout(() => {
          this.animateMergeTop();
        }, 500);
        setTimeout(() => {
          this.mergeTilesTop();
        }, 1000);
        break;
      case ALLOWED_MOVES.RIGHT:
        this.moveTilesRight();
        setTimeout(() => {
          this.animateMergeRight();
        }, 500);
        setTimeout(() => {
          this.mergeTilesRight();
        }, 1000);
        break;
      case ALLOWED_MOVES.DOWN:
        this.moveTilesDown();
        setTimeout(() => {
          this.animateMergeDown();
        }, 500);
        setTimeout(() => {
          this.mergeTilesDown();
        }, 1000);
        break;
      case ALLOWED_MOVES.LEFT:
        this.moveTilesLeft();
        setTimeout(() => {
          this.animateMergeLeft();
        }, 500);
        setTimeout(() => {
          this.mergeTilesLeft();
        }, 1000);
        break;
    }
  }

  private setTilesNotNew(): void {
    this.tiles.forEach((row) => {
      row.forEach((col) => {
        if (!!col) {
          col.setIsNew(false);
        }
      });
    });
  }

  private moveTilesTop(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      let spaceCounter = 0;
      for (let j = 0; j < this.tiles[i].length; j += 1) {
        if (!!this.tiles[j][i]) {
          this.tiles[j - spaceCounter][i] = cloneDeep(this.tiles[j][i]);
          this.tiles[j - spaceCounter][i].setAnimationClass(`${ANIMATION_CLASS.MOVE_TOP}${spaceCounter}`);
          if (spaceCounter > 0) {
            this.tiles[j][i] = null;
            this.playSoundEffect(SOUND_EFFECTS.MOVE);
          }
        } else {
          spaceCounter += 1;
        }
      }
    }
  }

  private animateMergeTop(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      for (let j = 0; j < this.tiles[i].length; j += 1) {
        if (
          !!this.tiles[j][i] &&
          !!this.tiles[j + 1] &&
          !!this.tiles[j + 1][i] &&
          this.tiles[j][i].getValue() === this.tiles[j + 1][i].getValue()
        ) {
          this.tiles[j + 1][i].setAnimationClass(ANIMATION_CLASS.MERGE_TOP);
          this.playSoundEffect(SOUND_EFFECTS.MERGE);
        }
      }
    }
  }

  private mergeTilesTop(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      for (let j = 0; j < this.tiles[i].length; j += 1) {
        if (
          !!this.tiles[j][i] &&
          !!this.tiles[j + 1] &&
          !!this.tiles[j + 1][i] &&
          this.tiles[j][i].getValue() === this.tiles[j + 1][i].getValue()
        ) {
          this.tiles[j][i].setValue(this.tiles[j][i].getValue() * 2);
          this.addScore(this.tiles[j][i].getValue());
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
        if (!!this.tiles[j][i]) {
          this.tiles[j + spaceCounter][i] = cloneDeep(this.tiles[j][i]);
          this.tiles[j + spaceCounter][i].setAnimationClass(`${ANIMATION_CLASS.MOVE_DOWN}${spaceCounter}`);
          if (spaceCounter > 0) {
            this.tiles[j][i] = null;
            this.playSoundEffect(SOUND_EFFECTS.MOVE);
          }
        } else {
          spaceCounter += 1;
        }
      }
    }
  }

  private animateMergeDown(): void {
    for (let i = this.tiles.length - 1; i >= 0; i -= 1) {
      for (let j = this.tiles[i].length - 1; j >= 0; j -= 1) {
        if (
          !!this.tiles[j][i] &&
          !!this.tiles[j - 1] &&
          !!this.tiles[j - 1][i] &&
          this.tiles[j][i].getValue() === this.tiles[j - 1][i].getValue()
        ) {
          this.tiles[j - 1][i].setAnimationClass(ANIMATION_CLASS.MERGE_DOWN);
          this.playSoundEffect(SOUND_EFFECTS.MERGE);
        }
      }
    }
  }

  private mergeTilesDown(): void {
    for (let i = this.tiles.length - 1; i >= 0; i -= 1) {
      for (let j = this.tiles[i].length - 1; j >= 0; j -= 1) {
        if (
          !!this.tiles[j][i] &&
          !!this.tiles[j - 1] &&
          !!this.tiles[j - 1][i] &&
          this.tiles[j][i].getValue() === this.tiles[j - 1][i].getValue()
        ) {
          this.tiles[j][i].setValue(this.tiles[j][i].getValue() * 2);
          this.addScore(this.tiles[j][i].getValue());
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
        if (!!this.tiles[i][j]) {
          this.tiles[i][j + spaceCounter] = cloneDeep(this.tiles[i][j]);
          this.tiles[i][j + spaceCounter].setAnimationClass(`${ANIMATION_CLASS.MOVE_RIGHT}${spaceCounter}`);
          if (spaceCounter > 0) {
            this.tiles[i][j] = null;
            this.playSoundEffect(SOUND_EFFECTS.MOVE);
          }
        } else {
          spaceCounter += 1;
        }
      }
    }
  }

  private animateMergeRight(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      for (let j = this.tiles[i].length - 1; j >= 0; j -= 1) {
        if (!!this.tiles[i][j] && !!this.tiles[i][j - 1] && this.tiles[i][j].getValue() === this.tiles[i][j - 1].getValue()) {
          this.tiles[i][j - 1].setAnimationClass(ANIMATION_CLASS.MERGE_RIGHT);
          this.playSoundEffect(SOUND_EFFECTS.MERGE);
        }
      }
    }
  }

  private mergeTilesRight(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      for (let j = this.tiles[i].length - 1; j >= 0; j -= 1) {
        if (!!this.tiles[i][j] && !!this.tiles[i][j - 1] && this.tiles[i][j].getValue() === this.tiles[i][j - 1].getValue()) {
          this.tiles[i][j].setValue(this.tiles[i][j].getValue() * 2);
          this.addScore(this.tiles[i][j].getValue());
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
        if (!!this.tiles[i][j]) {
          this.tiles[i][j - spaceCounter] = cloneDeep(this.tiles[i][j]);
          this.tiles[i][j - spaceCounter].setAnimationClass(`${ANIMATION_CLASS.MOVE_LEFT}${spaceCounter}`);
          if (spaceCounter > 0) {
            this.tiles[i][j] = null;
            this.playSoundEffect(SOUND_EFFECTS.MOVE);
          }
        } else {
          spaceCounter += 1;
        }
      }
    }
  }

  private animateMergeLeft(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      for (let j = 0; j < this.tiles[i].length; j += 1) {
        if (!!this.tiles[i][j] && !!this.tiles[i][j + 1] && this.tiles[i][j].getValue() === this.tiles[i][j + 1].getValue()) {
          this.tiles[i][j + 1].setAnimationClass(ANIMATION_CLASS.MERGE_LEFT);
          this.playSoundEffect(SOUND_EFFECTS.MERGE);
        }
      }
    }
  }

  private mergeTilesLeft(): void {
    for (let i = 0; i < this.tiles.length; i += 1) {
      for (let j = 0; j < this.tiles[i].length; j += 1) {
        if (!!this.tiles[i][j] && !!this.tiles[i][j + 1] && this.tiles[i][j].getValue() === this.tiles[i][j + 1].getValue()) {
          this.tiles[i][j].setValue(this.tiles[i][j].getValue() * 2);
          this.addScore(this.tiles[i][j].getValue());
          this.tiles[i][j + 1] = null;
          this.moveTilesLeft();
        }
      }
    }
  }

  private addScore(acum: number): void {
    this.score += acum;
    if (this.score >= WIN_SCORE) {
      this.playSoundEffect(SOUND_EFFECTS.VICTORY);
    }
  }

  private playSoundEffect(effect: string): void {
    if (this.soundEnabled) {
      const audio = new Audio();
      audio.src = effect;
      switch (effect) {
        case SOUND_EFFECTS.MERGE:
          audio.volume = 0.75;
          break;
        case SOUND_EFFECTS.MOVE:
          audio.volume = 0.35;
          break;
        case SOUND_EFFECTS.NEW_TILE:
          audio.volume = 0.25;
          break;
        case SOUND_EFFECTS.VICTORY:
          audio.volume = 0.8;
          break;
      }
      audio.load();
      audio.play();
    }
  }
}
