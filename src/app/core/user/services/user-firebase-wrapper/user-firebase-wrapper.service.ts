import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat';
import { User } from 'src/app/data/models';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { EMPTY, Observable, catchError, from, map, of, switchMap, take, throwError } from 'rxjs';

@Injectable()
export class UserFirebaseWrapperService {
  constructor(private afs: AngularFirestore) {}

  // getAll(): Observable<User[]> {}

  // createUserRecording(uid: firebase.default.auth.UserCredential): Observable<User> {}

  // getUser(uid: string): Observable<User> {}

  getSpecificUser(email: string): Observable<User> {
    return this.getUserByQuery(email, (collection) => collection.where('email', '==', email));
  }

  private getUserByQuery(user_identifier: string, query: QueryFn<firebase.default.firestore.DocumentData>): Observable<User> {
    return this.afs
      .collection<User>('users', query)
      .valueChanges()
      .pipe(
        switchMap((users) => {
          debugger
          if (!users?.length) {
            return throwError(new Error('NO_USERS_ERROR'));
          }

          if (users.length > 1) {
            return throwError(new Error('MORE_THAN_ONE_USER_ERROR'));
          }

          return of(users[0]);
        }),
        take(1)
      );
  }

  createNewUser(email: string, uid: string, name: string): Observable<User | undefined> {
    return this.getSpecificUser(email).pipe(
      switchMap((_) => {
        debugger
        return throwError(new Error('USER_ALREADY_EXISTS'));
      }),
      catchError((err) => {
        debugger
        if (err.message === 'NO_USERS_ERROR') {
          const newUser: User = {
            email: email,
            name: name,
            uid: uid
          };

          return from(this.getUsersCollectionReference().doc(uid).set(newUser)).pipe(
            switchMap(() => {
              return this.getUsersCollectionReference()
                .doc(uid)
                .get()
                .pipe(map((snap) => snap.data()));
            })
          );
        }
        return EMPTY;
      })
    );
  }

  private getUsersCollectionReference(): AngularFirestoreCollection<User> {
    return this.afs.collection<User>('users');
  }
}
