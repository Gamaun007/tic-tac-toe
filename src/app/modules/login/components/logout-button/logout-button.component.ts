import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/services';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
})
export class LogoutButtonComponent {
  constructor(private auth: AuthenticationService) {}

  logout(): void {
    this.auth.signOut();
  }
}
