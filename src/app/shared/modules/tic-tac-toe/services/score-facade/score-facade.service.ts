import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, firstValueFrom, from, map, switchMap } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { Score } from 'src/app/data/models';

const FetchForScoreAmount = 10;

@Injectable()
export class ScoreFacadeService {
  constructor(private afs: AngularFirestore) {}

  getScore(): Observable<Score[]> {
    return this.getScoreByQuery((ref) => ref.orderBy('score', 'desc').limit(FetchForScoreAmount));
  }

  async addNewScore(score: number, uid: string, session_id: string): Promise<void> {
    if(score) {
      await this.createNewRecord(uid, score, session_id);
    }
  }

  getSpecificScore(session_id: string): Observable<Score> {
    return this.getScoreCollectionReference()
      .doc(session_id)
      .get()
      .pipe(map((snap) => snap?.data()));
  }

  private getScoreByQuery(query: QueryFn<firebase.default.firestore.DocumentData>): Observable<Score[]> {
    return this.afs.collection<Score>('score', query).valueChanges();
  }

  private async createNewRecord(uid: string, score: number, session_id: string): Promise<Score | undefined> {
    return await firstValueFrom(
      this.getSpecificScore(session_id).pipe(
        switchMap((record) => {
          let operation: Observable<void>;
          if (!record) {
            operation = from(
              this.getScoreCollectionReference().doc(session_id).set({
                uid: uid,
                session_id,
                score,
              })
            );
          } else {
            operation = from(
              this.getScoreCollectionReference().doc(session_id).update({
                score,
              })
            );
          }

          return operation.pipe(
            switchMap(() => {
              return this.getScoreCollectionReference()
                .doc(session_id)
                .get()
                .pipe(map((snap) => snap.data()));
            })
          );
        }),
        catchError((err) => {
          return EMPTY;
        })
      )
    );
  }

  private getScoreCollectionReference(): AngularFirestoreCollection<Score> {
    return this.afs.collection<Score>('score');
  }
}
