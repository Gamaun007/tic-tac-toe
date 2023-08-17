import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundLayoutComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/constants/routes.constant';

const routes: Routes = [
  {
    path: AppRoutes.Game,
    children: [
      {
        path: '',
        component: PlaygroundLayoutComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [PlaygroundLayoutComponent],
  imports: [ CommonModule],
})
export class PlaygroundModule {}
