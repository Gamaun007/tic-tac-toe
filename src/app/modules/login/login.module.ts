import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [CommonModule, ClarityModule],
  exports: [SignUpComponent, SignInComponent],
})
export class LoginModule {}
