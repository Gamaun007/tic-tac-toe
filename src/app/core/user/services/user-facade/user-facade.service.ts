import { Injectable } from '@angular/core';
import { Observable, filter, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/services';
import { User } from 'src/app/data/models';
import { UserFirebaseWrapperService } from '../user-firebase-wrapper/user-firebase-wrapper.service';

@Injectable()
export class UserFacadeService {
  constructor(private userFirebaseWrapper: UserFirebaseWrapperService, private auth: AuthenticationService) {}

  getCurrentUser(): Observable<User> {
    return this.auth.isAuthenticated().pipe(
      filter(Boolean),
      switchMap((creds) => this.userFirebaseWrapper.getSpecificUser(creds?.email as string))
    );
  }
}
