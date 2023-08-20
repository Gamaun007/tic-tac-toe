import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreSidePanelComponent } from './components/score-side-panel/score-side-panel.component';
import { ScoreItemComponent } from './components/score-item/score-item.component';
import { TicTacToeModule } from 'src/app/shared/modules/tic-tac-toe/tic-tac-toe.modules';

@NgModule({
  declarations: [ScoreSidePanelComponent, ScoreItemComponent],
  imports: [CommonModule],
  exports: [ScoreSidePanelComponent, ScoreItemComponent],
})
export class ScoreTableModule {}
