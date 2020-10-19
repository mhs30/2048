export class Tile {
  private value: number;
  private animationClass: string;
  private isNew: boolean;

  constructor() {
    this.setNewTileValue();
    this.animationClass = '';
    this.isNew = true;
  }
  getValue(): number {
    return this.value;
  }
  setValue(val: number): void {
    this.value = val;
  }
  private setNewTileValue(): void {
    this.setValue(Math.random() < 0.5 ? 2 : 4);
  }
  getAnimationClass(): string {
    return this.animationClass;
  }
  setAnimationClass(animation: string): void {
    this.animationClass = animation;
  }
  getIsNew(): boolean {
    return this.isNew;
  }
  setIsNew(val: boolean): void {
    this.isNew = val;
  }
}
