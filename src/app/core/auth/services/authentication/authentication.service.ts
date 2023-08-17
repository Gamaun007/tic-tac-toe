import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import * as auth from 'firebase/compat';

@Injectable()
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth) {}

  signUpWithEmail(email: string, password: string): Observable<auth.default.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
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
