import { UserFacadeService } from 'src/app/core/user/services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  distinctUntilChanged,
  filter,
  map,
  firstValueFrom,
  Subscription,
  switchMap,
  combineLatest,
  BehaviorSubject,
  take,
} from 'rxjs';
import { Player } from 'src/app/shared/modules/tic-tac-toe/models/game-session.models';
import { AiPlayerService } from 'src/app/shared/modules/tic-tac-toe/services/ai-bot-player/ai-bot-player.service';
import { GameSessionHelperService } from 'src/app/shared/modules/tic-tac-toe/services/game-session-helper/game-session-helper.service';
import { User } from 'src/app/data/models';
import { ScoreFacadeService } from 'src/app/shared/modules/tic-tac-toe/services/score-facade/score-facade.service';
import { AuthenticationService } from 'src/app/core/auth/services';

@Component({
  selector: 'app-playground-layout',
  templateUrl: './playground-layout.component.html',
  styleUrls: ['./playground-layout.component.scss'],
})
export class PlaygroundLayoutComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private readonly viewMarks = {
    ['true']: 'X',
    ['false']: 'O',
  };

  userGoFirst = true;
  currentUser: User;
  sessionInitialized$: Observable<boolean>;
  roundTableData$: Observable<(Player | null)[]>;
  userWinAmount$: Observable<number>;
  userLost$ = new BehaviorSubject<any>(undefined);
  viewMarks$: Observable<{ [key in Player]: 'X' | 'O' }>;

  constructor(
    private gameSessionHelperService: GameSessionHelperService,
    private aiPlayerService: AiPlayerService,
    private userFacadeService: UserFacadeService,
    private scoreFacadeService: ScoreFacadeService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.sessionInitialized$ = this.gameSessionHelperService.Session.pipe(map(Boolean));

    const sessionRounds = this.gameSessionHelperService.Session.pipe(
      filter(Boolean),
      map((session) => session.rounds),
      distinctUntilChanged()
    );

    this.viewMarks$ = this.gameSessionHelperService.Session.pipe(
      map((session) => session.userTurnFirst),
      map((isUserTurnsFirst) => {
        return {
          [Player.USER]: this.viewMarks[isUserTurnsFirst.toString()],
          [Player.AI]: this.viewMarks[(!isUserTurnsFirst).toString()],
        };
      })
    );

    this.userWinAmount$ = this.gameSessionHelperService.getCurrentSessionUserWins();

    const sub1 = this.userFacadeService.getCurrentUser().subscribe((user) => (this.currentUser = user));

    const sub2 = sessionRounds
      .pipe(
        map((sessionRounds) => Object.values(sessionRounds).find((round) => round.winner === Player.AI)),
        filter(Boolean)
      )
      .subscribe(() => {
        this.userLost$.next({});
      });

    this.saveScoreOnUserLoggedIn();
    this.closeSessionOnLogout();

    this.subscriptions.push(sub1, sub2);
    this.roundTableData$ = this.gameSessionHelperService.RoundBoardState;
  }

  ngOnDestroy(): void {
    this.finish();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async cellClicked(index: number): Promise<void> {
    const isRoundInContinuation = this.gameSessionHelperService.takeTurn(index, Player.USER);
    if (isRoundInContinuation !== false) {
      if (this.currentUser) {
        this.saveCurrentUserScore();
      }
      if (isRoundInContinuation === 'continue') {
        const choosenCell = this.aiPlayerService.makeMove(await firstValueFrom(this.roundTableData$));
        this.gameSessionHelperService.takeTurn(choosenCell, Player.AI);
      }
    }
  }

  async saveCurrentUserScore(): Promise<void> {
    const promisesResolved = await Promise.all([
      firstValueFrom(this.userWinAmount$),
      firstValueFrom(this.gameSessionHelperService.Session.pipe(map((session) => session?.session_id))),
    ]);
    this.scoreFacadeService.addNewScore(promisesResolved[0], this.currentUser.uid, promisesResolved[1]);
  }

  start(): void {
    this.userLost$.next(false);
    this.gameSessionHelperService.startSession(this.userGoFirst);
  }

  finish(): void {
    this.gameSessionHelperService.finishSession();
  }

  private closeSessionOnLogout(): void {
    this.subscriptions.push(this.authService.onSignOut$.subscribe(() => this.finish()));
  }

  private saveScoreOnUserLoggedIn(): void {
    this.subscriptions.push(
      combineLatest([this.authService.onSignIn$, this.authService.onSignOut$])
        .pipe(
          switchMap((v) => {
            return this.userFacadeService.getCurrentUser().pipe(filter(Boolean), distinctUntilChanged(), take(1));
          })
        )
        .subscribe(() => {
          this.saveCurrentUserScore();
        })
    );
  }
}
