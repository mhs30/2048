import { Component, OnDestroy, OnInit } from '@angular/core';
import { Board } from 'src/app/entities/board.entities';
import { GameService } from 'src/app/services/game.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { COLOR_CODES } from 'src/app/entities/constants.entities';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public board: Board;

  private unsuscribe$ = new Subject<boolean>();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.board$.pipe(takeUntil(this.unsuscribe$)).subscribe((board: Board) => {
      this.board = board;
      console.log(this.board);
    });
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next(true);
    this.unsuscribe$.unsubscribe();
  }

  public findColor(tileValue: number): string {
    return COLOR_CODES.get(tileValue);
  }
}
