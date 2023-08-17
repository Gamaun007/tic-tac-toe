import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { LeftSideComponent, MainContentComponent, TopHeaderComponent } from './components';
import { LoginModule } from '../modules/login/login.module';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundLayoutComponent } from '../modules/playground/components';
import { AppRoutes } from '../constants/routes.constant';

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
  declarations: [LeftSideComponent, TopHeaderComponent, MainContentComponent],
  exports: [LeftSideComponent, TopHeaderComponent, MainContentComponent],
  imports: [RouterModule, CommonModule, ClarityModule, LoginModule, RouterModule.forChild(routes)],
})
export class LayoutModule {}
