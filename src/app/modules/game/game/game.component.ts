import { Component, HostListener, OnInit } from '@angular/core';
import { ALLOWED_MOVES, ARROW_KEY_CODES } from 'src/app/entities/constants.entities';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.start();
  }
}
