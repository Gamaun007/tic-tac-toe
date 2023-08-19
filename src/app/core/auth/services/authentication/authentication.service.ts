import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, firstValueFrom, from, switchMap } from 'rxjs';
import * as auth from 'firebase/compat';
import { UserFirebaseWrapperService } from 'src/app/core/user/services';
import { User } from 'src/app/data/models';

@Injectable()
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth, private userFirebaseWrapper: UserFirebaseWrapperService) {}

  async signUpWithEmail(email: string, name: string, password: string): Promise<void> {
    try {
      debugger;
      const creds = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await firstValueFrom(this.userFirebaseWrapper.createNewUser(email, creds.user?.uid as string, name));
    } catch (e) {
      console.log(e);
    }
  }

  signInWithEmail(email: string, password: string): Observable<auth.default.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  signOut(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  isAuthenticated(): Observable<auth.default.User | null> {
    return this.afAuth.user;
  }
}
