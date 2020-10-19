import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Board } from 'src/app/entities/board.entities';
import { LOCAL_STORAGE_KEY } from 'src/app/entities/constants.entities';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.scss'],
})
export class ScorePanelComponent implements OnInit, OnDestroy {
  public board: Board;
  public isDesktop: boolean;
  private unsuscribe$ = new Subject<boolean>();

  constructor(private gameService: GameService, private deviceService: DeviceDetectorService) {
    this.isDesktop = this.deviceService.isDesktop();
  }

  ngOnInit(): void {
    this.gameService.board$.pipe(takeUntil(this.unsuscribe$)).subscribe((board: Board) => {
      this.board = board;
    });
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next(true);
    this.unsuscribe$.unsubscribe();
  }

  public getBestScore(): number {
    return !!localStorage.getItem(LOCAL_STORAGE_KEY) ? parseInt(localStorage.getItem(LOCAL_STORAGE_KEY), 10) : 0;
  }
}
