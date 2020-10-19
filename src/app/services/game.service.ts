import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '../entities/board.entities';
import { cloneDeep } from 'lodash';
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
    this.boardSubject.next(cloneDeep(this.board));
  }

  public move(direction: string): void {
    if (!!this.board && !!this.board.getTiles()) {
      this.board.moveTiles(direction);
      setTimeout(() => {
        this.board.generateNewTiles();
        this.boardSubject.next(cloneDeep(this.board));
      }, 1000);
    }
  }
}
