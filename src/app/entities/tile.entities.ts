export class Tile {
  value: number;
  position: { row: number; col: number };
  constructor(value: number, position: { row: number; col: number }) {
    this.value = value;
    this.position = position;
  }
}
