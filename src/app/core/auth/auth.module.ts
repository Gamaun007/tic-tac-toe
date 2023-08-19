import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationInterceptorService, AuthenticationService } from './services';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, UserModule],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthenticationService, AuthenticationInterceptorService, AngularFireAuthModule],
    };
  }
}
