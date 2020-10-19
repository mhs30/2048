import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game/game.component';
import { ScorePanelComponent } from './score-panel/score-panel.component';
import { BoardComponent } from './board/board.component';
import { SharedModule } from '../shared/shared.module';
import { WinDialogComponent } from './score-panel/win-dialog/win-dialog.component';
import { LoseDialogComponent } from './score-panel/lose-dialog/lose-dialog.component';

@NgModule({
  declarations: [GameComponent, ScorePanelComponent, BoardComponent, WinDialogComponent, LoseDialogComponent],
  imports: [CommonModule, GameRoutingModule, SharedModule],
})
export class GameModule {}
