import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { LeftSideComponent, MainContentComponent, TopHeaderComponent } from './components';
import { LoginModule } from '../modules/login/login.module';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundLayoutComponent } from '../modules/playground/components';
import { AppRoutes } from '../constants/routes.constant';
import { ScoreTableModule } from '../modules/score-table/score-table.module';

const routes: Routes = [
  {
    path: AppRoutes.Game,
    children: [
      {
        path: '',
        loadChildren: () => import('../modules/playground/playground.module').then((m) => m.PlaygroundModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: AppRoutes.Game,
  },
];

@NgModule({
  declarations: [LeftSideComponent, TopHeaderComponent, MainContentComponent],
  exports: [LeftSideComponent, TopHeaderComponent, MainContentComponent],
  imports: [RouterModule, CommonModule, ClarityModule, LoginModule, RouterModule.forChild(routes), ScoreTableModule],
})
export class LayoutModule {}
