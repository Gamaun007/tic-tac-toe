import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  openModal = false;

  get isFormInvalid(): boolean {
    return this.signInForm.invalid;
  }

  constructor(private auth: AuthenticationService) {}

  login(): void {
    this.auth.signInWithEmail(this.signInForm.controls.email.value, this.signInForm.controls.password.value);
  }
}
