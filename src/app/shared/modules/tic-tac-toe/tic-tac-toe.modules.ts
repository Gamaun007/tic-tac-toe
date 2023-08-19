import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSessionHelperService } from './services/game-session-helper/game-session-helper.service';
import { AiPlayerService } from './services/ai-bot-player/ai-bot-player.service';

@NgModule({
  imports: [CommonModule],
})
export class TicTacToeModule {
  static forRoot(): ModuleWithProviders<TicTacToeModule> {
    return {
      ngModule: TicTacToeModule,
      providers: [GameSessionHelperService, AiPlayerService],
    };
  }
}
