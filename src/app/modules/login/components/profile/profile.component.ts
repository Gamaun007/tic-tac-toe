import { Component } from '@angular/core';
import { Observable, filter, map, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/services';
import { UserFacadeService } from 'src/app/core/user/services';
import { User } from 'src/app/data/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private auth: AuthenticationService, private userFacadeService: UserFacadeService) {}

  userAuthenticated$!: Observable<boolean>;
  userData$: Observable<User | undefined>;

  ngOnInit(): void {
    this.userAuthenticated$ = this.auth.isAuthenticated().pipe(map((creds) => !!creds));

    this.userData$ = this.userAuthenticated$.pipe(
      filter(Boolean),
      switchMap(() => this.userFacadeService.getCurrentUser())
    );
  }
}
