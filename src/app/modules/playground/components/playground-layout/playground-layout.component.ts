import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, distinctUntilChanged, filter, map, firstValueFrom } from 'rxjs';
import { Player } from 'src/app/shared/modules/tic-tac-toe/models/game-session.models';
import { AiPlayerService } from 'src/app/shared/modules/tic-tac-toe/services/ai-bot-player/ai-bot-player.service';
import { GameSessionHelperService } from 'src/app/shared/modules/tic-tac-toe/services/game-session-helper/game-session-helper.service';

@Component({
  selector: 'app-playground-layout',
  templateUrl: './playground-layout.component.html',
  styleUrls: ['./playground-layout.component.scss'],
})
export class PlaygroundLayoutComponent implements OnInit, OnDestroy {
  sessionInitialized$: Observable<boolean>;
  roundTableData$: Observable<(Player | null)[]>;

  userWinAmount$: Observable<number>;
  userLost$ = new Subject<any>();
  constructor(private gameSessionHelperService: GameSessionHelperService, private aiPlayerService: AiPlayerService) {}

  ngOnDestroy(): void {
    this.finish();
  }

  ngOnInit(): void {
    this.sessionInitialized$ = this.gameSessionHelperService.Session.pipe(map(Boolean));
    const sessionRounds = this.gameSessionHelperService.Session.pipe(
      filter(Boolean),
      map((session) => session.rounds),
      distinctUntilChanged()
    );
    this.userWinAmount$ = sessionRounds.pipe(
      map((rounds) => Object.values(rounds).filter((round) => round.winner === Player.USER).length)
    );

    sessionRounds
      .pipe(
        map((sessionRounds) => Object.values(sessionRounds).find((round) => round.winner === Player.AI)),
        filter(Boolean)
      )
      .subscribe((userLost) => {
        this.userLost$.next({});
      });
    this.roundTableData$ = this.gameSessionHelperService.RoundBoardState;
  }

  async cellClicked(index: number): Promise<void> {
    const isRoundInContinuation = this.gameSessionHelperService.takeTurn(index, Player.USER);
    if (isRoundInContinuation === 'continue') {
      const choosenCell = this.aiPlayerService.makeMove(await firstValueFrom(this.roundTableData$));
      this.gameSessionHelperService.takeTurn(choosenCell, Player.AI);
    }
  }

  start(): void {
    this.userLost$.next(false);
    this.gameSessionHelperService.startSession(true);
  }

  finish(): void {
    this.gameSessionHelperService.finishSession();
  }
}
