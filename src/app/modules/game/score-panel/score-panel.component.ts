import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Board } from 'src/app/entities/board.entities';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.scss'],
})
export class ScorePanelComponent implements OnInit, OnDestroy {
  public board: Board;

  private unsuscribe$ = new Subject<boolean>();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.board$.pipe(takeUntil(this.unsuscribe$)).subscribe((board: Board) => {
      this.board = board;
    });
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next(true);
    this.unsuscribe$.unsubscribe();
  }
}
