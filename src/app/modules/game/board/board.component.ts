import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Board } from 'src/app/entities/board.entities';
import { GameService } from 'src/app/services/game.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ALLOWED_MOVES, ARROW_KEY_CODES, COLOR_CODES } from 'src/app/entities/constants.entities';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private defaultTouch = { x: 0, y: 0, time: 0 };
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
