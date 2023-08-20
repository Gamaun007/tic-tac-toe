import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundLayoutComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeModule } from 'src/app/shared/modules/tic-tac-toe/tic-tac-toe.modules';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundLayoutComponent,
  },
];

@NgModule({
  declarations: [PlaygroundLayoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PlaygroundModule {}
