import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, distinctUntilChanged, map, startWith, switchMap, zip } from 'rxjs';
import { UserFacadeService } from 'src/app/core/user/services';
import { Score } from 'src/app/data/models';
import { GameSessionHelperService } from 'src/app/shared/modules/tic-tac-toe/services/game-session-helper/game-session-helper.service';
import { ScoreFacadeService } from 'src/app/shared/modules/tic-tac-toe/services/score-facade/score-facade.service';

@Component({
  selector: 'app-score-side-panel',
  templateUrl: './score-side-panel.component.html',
  styleUrls: ['./score-side-panel.component.scss'],
})
export class ScoreSidePanelComponent implements OnInit {
  constructor(
    private scoreFacade: ScoreFacadeService,
    private gameSessionHelper: GameSessionHelperService,
    private userFacade: UserFacadeService
  ) {}

  topScores$: Observable<Score[]>;

  scoresToDisplay$: Observable<Score[]>;
  sessionId$: Observable<string>;

  trackByItemsRef = this.trackByItems.bind(this);

  ngOnInit(): void {
    this.topScores$ = this.scoreFacade.getScore();
    this.sessionId$ = this.gameSessionHelper.Session.pipe(map((session) => session?.session_id));

    this.scoresToDisplay$ = this.userFacade.getCurrentUser().pipe(
      map((user) => user?.uid),
      distinctUntilChanged(),
      switchMap((userId) => {
        return combineLatest([
          this.topScores$,
          this.sessionId$.pipe(startWith(undefined)),
          this.gameSessionHelper.getCurrentSessionUserWins().pipe(startWith(undefined)),
        ]).pipe(
          map(([scores, sessionId, currentWins]) => {
            if(!currentWins || !sessionId) {
              return scores;
            }
            if (!userId || !scores?.find((score) => score.uid === userId && score.session_id === sessionId)) {
              return [...scores, { uid: userId, session_id: sessionId, score: currentWins }].sort(
                (a, b) => b.score - a.score  
              );
            }
            return scores;
          })
        );
      })
    );

  }

  trackByItems(index: number, item: Score): string {
    return item.session_id;
  }
}
