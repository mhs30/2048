export class Tile {
  value: number;
  position: { row: number; col: number };
  animationClass: string;
  isNew: boolean;
  constructor(value: number, position: { row: number; col: number }) {
    this.value = value;
    this.position = position;
    this.animationClass = '';
    this.isNew = true;
  }
}
