import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppRoutes } from 'src/app/constants/routes.constant';

@Injectable()
export class AuthenticationInterceptorService {
  constructor(private authService: AuthenticationService, private router: Router) {}

  // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
  //   this.store.dispatch(new InitializeAppAction());
  //   return true;
  // }

//   async canActivate(_: any, state: RouterStateSnapshot): Promise<boolean> {
//     // startsWith solves the bug with calling wrong authguard
//     if (!(await this.authService.isAuthenticatedAsync())) {
//       this.router.navigate([`/${AppRoutes.Login}`]);

//       return false;
//     }

//     return true;
//   }
}
