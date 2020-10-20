import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Board } from 'src/app/entities/board.entities';
import { GameService } from 'src/app/services/game.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  ALLOWED_MOVES,
  ARROW_KEY_CODES,
  BOARD_COLUMNS,
  BOARD_ROWS,
  COLOR_CODES,
  LOCAL_STORAGE_KEY,
  WIN_SCORE,
} from 'src/app/entities/constants.entities';
import ConfettiGenerator from 'confetti-js';
import { LoseDialogComponent } from '../../shared/lose-dialog/lose-dialog.component';
import { WinDialogComponent } from '../../shared/win-dialog/win-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private defaultTouch = { x: 0, y: 0, time: 0 };
  public placeholderBoard: any[][];
  public board: Board;

  private unsuscribe$ = new Subject<boolean>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.code === ARROW_KEY_CODES.UP_ARROW) {
      this.gameService.move(ALLOWED_MOVES.UP);
    }
    if (event.code === ARROW_KEY_CODES.RIGHT_ARROW) {
      this.gameService.move(ALLOWED_MOVES.RIGHT);
    }
    if (event.code === ARROW_KEY_CODES.DOWN_ARROW) {
      this.gameService.move(ALLOWED_MOVES.DOWN);
    }
    if (event.code === ARROW_KEY_CODES.LEFT_ARROW) {
      this.gameService.move(ALLOWED_MOVES.LEFT);
    }
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  handleTouch(event): void {
    event.preventDefault;
    const touch = event.touches[0] || event.changedTouches[0];
    // check the events
    if (event.type === 'touchstart') {
      this.defaultTouch.x = touch.pageX;
      this.defaultTouch.y = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      const deltaX = touch.pageX - this.defaultTouch.x;
      const deltaY = touch.pageY - this.defaultTouch.y;
      const deltaTime = event.timeStamp - this.defaultTouch.time;
      // simulte a swipe -> less than 500 ms and more than 60 px
      if (deltaTime < 500) {
        // touch movement lasted less than 500 ms
        if (Math.abs(deltaX) > 60) {
          // delta x is at least 60 pixels
          if (deltaX > 0) {
            this.doSwipeRight();
          } else {
            this.doSwipeLeft();
          }
        }
        if (Math.abs(deltaY) > 60) {
          // delta y is at least 60 pixels
          if (deltaY > 0) {
            this.doSwipeDown();
          } else {
            this.doSwipeUp();
          }
        }
      }
    }
  }

  constructor(private gameService: GameService, public dialog: MatDialog, private deviceService: DeviceDetectorService) {
    this.placeholderBoard = [...Array(BOARD_ROWS)].map((x) => Array(BOARD_COLUMNS).fill(null));
  }

  ngOnInit(): void {
    this.gameService.board$.pipe(takeUntil(this.unsuscribe$)).subscribe((board: Board) => {
      this.board = board;
      if (!!this.board && !!this.board.getScore() && this.board.getScore() >= WIN_SCORE) {
        const confettiSettings = { target: 'conffeti-canvas' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        this.board.new();
        const dialogRef = this.dialog.open(WinDialogComponent, { disableClose: true });

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
      if (this.deviceService.isDesktop()) {
        if (!!this.board && !!localStorage.getItem(LOCAL_STORAGE_KEY)) {
          const currentSavedScore = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY), 10);
          if (!!this.board.getScore() && this.board.getScore() > currentSavedScore) {
            localStorage.setItem(LOCAL_STORAGE_KEY, this.board.getScore().toString());
          }
        } else {
          localStorage.setItem(LOCAL_STORAGE_KEY, this.board.getScore().toString());
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next(true);
    this.unsuscribe$.unsubscribe();
  }

  private doSwipeLeft(): void {
    this.gameService.move(ALLOWED_MOVES.LEFT);
  }

  private doSwipeRight(): void {
    this.gameService.move(ALLOWED_MOVES.RIGHT);
  }

  private doSwipeUp(): void {
    this.gameService.move(ALLOWED_MOVES.UP);
  }

  private doSwipeDown(): void {
    this.gameService.move(ALLOWED_MOVES.DOWN);
  }

  public findColor(tileValue: number): string {
    return COLOR_CODES.get(tileValue);
  }
}
