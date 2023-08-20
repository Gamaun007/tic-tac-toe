import { Injectable } from '@angular/core';
import { EMPTY, Observable, filter, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/services';
import { User } from 'src/app/data/models';
import { UserFirebaseWrapperService } from '../user-firebase-wrapper/user-firebase-wrapper.service';

@Injectable()
export class UserFacadeService {
  constructor(private userFirebaseWrapper: UserFirebaseWrapperService, private auth: AuthenticationService) {}

  getCurrentUser(): Observable<User> {
    return this.auth.isAuthenticated().pipe(
      switchMap((creds) => {
        if (creds) {
          return this.userFirebaseWrapper.getSpecificUser(creds?.email as string);
        }
        return of(undefined);
      })
    );
  }

  getUserByUid(uid: string): Observable<User> {
    return this.userFirebaseWrapper.getSpecificUserByUid(uid);
  }
}
