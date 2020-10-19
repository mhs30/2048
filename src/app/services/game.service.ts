import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '../entities/board.entities';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private board: Board;
  private boardSubject: BehaviorSubject<Board>;
  public board$: Observable<Board>;

  constructor() {
    this.board = new Board();
    this.boardSubject = new BehaviorSubject<Board>(this.board);
    this.board$ = this.boardSubject.asObservable();
  }

  public start(): void {
    this.board.new();
    this.boardSubject.next(this.board);
  }

  public move(direction: string): void {
    this.board.moveTiles(direction);

    setTimeout(() => {
      this.board.generateNewTiles();
      this.boardSubject.next(this.board);
    }, 1000);
  }
}
