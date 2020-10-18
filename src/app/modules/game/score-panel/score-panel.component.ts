import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Board } from 'src/app/entities/board.entities';
import { GameService } from 'src/app/services/game.service';
import { LoseDialogComponent } from './lose-dialog/lose-dialog.component';
import { WinDialogComponent } from './win-dialog/win-dialog.component';

@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.scss'],
})
export class ScorePanelComponent implements OnInit, OnDestroy {
  public board: Board;

  private unsuscribe$ = new Subject<boolean>();

  constructor(private gameService: GameService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.gameService.board$.pipe(takeUntil(this.unsuscribe$)).subscribe((board: Board) => {
      this.board = board;
      if (!!this.board && this.board.score >= 2048) {
        this.dialog.open(WinDialogComponent);
        this.board.new();
      }
      if (!!this.board && this.board.gameOver) {
        this.dialog.open(LoseDialogComponent);
        this.board.new();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next(true);
    this.unsuscribe$.unsubscribe();
  }
}
