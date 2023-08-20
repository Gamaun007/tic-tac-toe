import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  readonly signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get isFormInvalid(): boolean {
    return this.signUpForm.invalid;
  }

  openModal = false;

  constructor(private auth: AuthenticationService) {}

  async signUpSubmit(): Promise<void> {
    const controls = this.signUpForm.controls;
    await this.auth.signUpWithEmail(controls.email.value, controls.name.value, controls.password.value);
  }
}
