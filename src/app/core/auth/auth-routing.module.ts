import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components';
import { AppRoutes } from 'src/app/constants/routes.constant';

const routes: Routes = [
  {
    path: AppRoutes.Login,
    component: LoginComponent,  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
