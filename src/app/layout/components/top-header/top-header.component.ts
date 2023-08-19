import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/services';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
})
export class TopHeaderComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}

  userAuthenticated$!: Observable<boolean>;

  ngOnInit(): void {
    this.userAuthenticated$ = this.auth.isAuthenticated().pipe(map((creds) => !!creds));
  }
}
