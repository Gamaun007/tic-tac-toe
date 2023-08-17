import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WildCardComponent } from './modules/utils/components';
import { AppRoutes } from './constants/routes.constant';
import { AuthenticationInterceptorService } from './core/auth/services';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [], // Should be replaced with actual auth guard
    children: [
      {
        path: AppRoutes.Game,
        loadChildren: () => import('./modules/playground/playground.module').then((m) => m.PlaygroundModule),
      },
      {
        path: '**',
        redirectTo: AppRoutes.Game
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
