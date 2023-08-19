import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundLayoutComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/constants/routes.constant';
import { TicTacToeModule } from 'src/app/shared/modules/tic-tac-toe/tic-tac-toe.modules';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundLayoutComponent,
  },
];

@NgModule({
  declarations: [PlaygroundLayoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TicTacToeModule, TicTacToeModule.forRoot()],
})
export class PlaygroundModule {}
