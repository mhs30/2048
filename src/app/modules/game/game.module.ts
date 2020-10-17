import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game/game.component';
import { ScorePanelComponent } from './score-panel/score-panel.component';
import { TileComponent } from './tile/tile.component';
import { BoardComponent } from './board/board.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GameComponent, ScorePanelComponent, TileComponent, BoardComponent],
  imports: [CommonModule, GameRoutingModule, SharedModule],
})
export class GameModule {}
