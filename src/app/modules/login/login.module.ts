import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

@NgModule({
  declarations: [SignUpComponent, SignInComponent, ProfileComponent, LogoutButtonComponent],
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  exports: [ProfileComponent],
})
export class LoginModule {}
