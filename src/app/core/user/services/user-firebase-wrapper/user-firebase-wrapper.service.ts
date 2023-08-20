import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat';
import { User } from 'src/app/data/models';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { EMPTY, Observable, catchError, filter, from, map, of, switchMap, take, tap, throwError } from 'rxjs';

@Injectable()
export class UserFirebaseWrapperService {
  private currentUserAccountOnCreation: boolean;
  constructor(private afs: AngularFirestore) {}

  getSpecificUser(email: string): Observable<User> {
    return this.getUserByQuery((collection) => collection.where('email', '==', email));
  }

  getSpecificUserByUid(uid: string): Observable<User> {
    return this.getUsersCollectionReference()
      .doc(uid)
      .get()
      .pipe(map((snap) => snap.data()));
  }

  private getUserByQuery(query: QueryFn<firebase.default.firestore.DocumentData>): Observable<User> {
    return this.afs
      .collection<User>('users', query)
      .valueChanges()
      .pipe(
        filter(() => !this.currentUserAccountOnCreation),
        switchMap((users) => {
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
        return throwError(new Error('USER_ALREADY_EXISTS'));
      }),
      catchError((err) => {
        if (err.message === 'NO_USERS_ERROR') {
          this.currentUserAccountOnCreation = true;
          const newUser: User = {
            email: email,
            name: name,
            uid: uid,
          };

          return from(this.getUsersCollectionReference().doc(uid).set(newUser)).pipe(
            tap(() => {
              this.currentUserAccountOnCreation = false;
            }),
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
