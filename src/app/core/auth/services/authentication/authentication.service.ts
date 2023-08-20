import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, firstValueFrom, from, switchMap, tap } from 'rxjs';
import * as auth from 'firebase/compat';
import { UserFirebaseWrapperService } from 'src/app/core/user/services';
import { User } from 'src/app/data/models';

@Injectable()
export class AuthenticationService {
  onSignUp$ = new BehaviorSubject<any>(undefined);
  onSignIn$ = new BehaviorSubject<any>(undefined);
  onSignOut$ = new BehaviorSubject<any>(undefined);

  constructor(private afAuth: AngularFireAuth, private userFirebaseWrapper: UserFirebaseWrapperService) {}

  async signUpWithEmail(email: string, name: string, password: string): Promise<void> {
    try {
      const creds = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await firstValueFrom(this.userFirebaseWrapper.createNewUser(email, creds.user?.uid as string, name));
      this.onSignUp$.next({});
    } catch (e) {
      console.log(e);
    }
  }

  async signInWithEmail(email: string, password: string): Promise<auth.default.auth.UserCredential> {
    const res = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.onSignIn$.next({});
    return res;
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.onSignOut$.next({});
    return ;
  }

  isAuthenticated(): Observable<auth.default.User | null> {
    return this.afAuth.user;
  }
}
