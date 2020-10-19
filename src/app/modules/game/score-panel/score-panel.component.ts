import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Board } from 'src/app/entities/board.entities';
import { LOCAL_STORAGE_KEY, WIN_SCORE } from 'src/app/entities/constants.entities';
import { GameService } from 'src/app/services/game.service';
import { LoseDialogComponent } from './lose-dialog/lose-dialog.component';
import { WinDialogComponent } from './win-dialog/win-dialog.component';
import confettiJs from 'confetti-js';
@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.scss'],
})
export class ScorePanelComponent implements OnInit, AfterViewInit, OnDestroy {
  public board: Board;

  private unsuscribe$ = new Subject<boolean>();

  constructor(private gameService: GameService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.gameService.board$.pipe(takeUntil(this.unsuscribe$)).subscribe((board: Board) => {
      this.board = board;
      if (!!this.board && this.board.getScore() >= WIN_SCORE) {
        const confettiSettings = { target: 'conffeti-canvas' };
        const confetti = new confettiJs(confettiSettings);
        confetti.render();
        const dialogRef = this.dialog.open(WinDialogComponent);
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            confetti.clear();
            this.board.new();
          }
        });
      }
      if (!!this.board && this.board.getGameOver()) {
        this.dialog.open(LoseDialogComponent);
        this.board.new();
      }
      if (!!this.board && !!localStorage.getItem(LOCAL_STORAGE_KEY)) {
        const currentSavedScore = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY), 10);
        if (this.board.getScore() > currentSavedScore) {
          localStorage.setItem(LOCAL_STORAGE_KEY, this.board.getScore().toString());
        }
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, this.board.getScore().toString());
      }
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.unsuscribe$.next(true);
    this.unsuscribe$.unsubscribe();
  }

  public getBestScore(): number {
    return !!localStorage.getItem(LOCAL_STORAGE_KEY) ? parseInt(localStorage.getItem(LOCAL_STORAGE_KEY), 10) : 0;
  }
}
