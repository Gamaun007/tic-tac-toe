import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player, Round, SessionData, TurnRecord } from '../../models/game-session.models';
import { FieldDimensions } from '../../constants/field-dimension.constant';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameSessionHelperService {
  private roundBoardState$: BehaviorSubject<(Player | null)[]>;
  private readonly currentSession$ = new BehaviorSubject<SessionData>(undefined);
  private readonly currentSessionRound$ = new BehaviorSubject<Round>(undefined);

  get Session(): Observable<SessionData> {
    return this.currentSession$.asObservable();
  }

  get SessionRound(): Observable<Round> {
    return this.currentSessionRound$.asObservable();
  }

  get RoundBoardState(): Observable<(Player | null)[]> {
    return this.roundBoardState$.asObservable();
  }

  constructor() {
    this.initRoundBoardState();
  }

  startSession(userTurnFirst: boolean): void {
    this.finishSession();
    const nextRoundOfCurrentSession = this.createNextSessionRoundObject();
    console.log('nextRoundOfCurrentSession', nextRoundOfCurrentSession);

    this.currentSessionRound$.next(nextRoundOfCurrentSession);
    this.currentSession$.next({
      rounds: { [nextRoundOfCurrentSession.id]: nextRoundOfCurrentSession },
      session_id: uuidv4(),
      userTurnFirst,
    });
  }

  nextRound(): void {
    this.initRoundBoardState();
    const nextRoundOfCurrentSession = this.createNextSessionRoundObject();

    this.currentSessionRound$.next(nextRoundOfCurrentSession);
    this.currentSession$.next({
      ...this.currentSession$.value,
      rounds: { ...this.currentSession$.value.rounds, [nextRoundOfCurrentSession.id]: nextRoundOfCurrentSession },
    });
  }

  takeTurn(cellIndex: number, player: Player): void | 'continue' | false {
    // Update round table cache;
    if (this.roundBoardState$.value[cellIndex]) return false;
    this.roundBoardState$.value[cellIndex] = player;

    const updatedTurns = [...this.currentSessionRound$.value.turns, { cellIndex, by: player }];
    const roundResult = this.checkRoundStatus(updatedTurns, player);
    if (roundResult === 'continue') {
      this.currentSessionRound$.next({
        ...this.currentSessionRound$.value,
        turns: updatedTurns,
      });

      this.currentSession$.next({
        ...this.currentSession$.value,
        rounds: {
          ...this.currentSession$.value.rounds,
          [this.currentSessionRound$.value.id]: this.currentSessionRound$.value,
        },
      });

      return 'continue';
    } else {
      this.currentSessionRound$.next({
        ...this.currentSessionRound$.value,
        turns: updatedTurns,
        winner: roundResult === 'win' ? player : roundResult,
      });

      this.currentSession$.next({
        ...this.currentSession$.value,
        rounds: {
          ...this.currentSession$.value.rounds,
          [this.currentSessionRound$.value.id]: this.currentSessionRound$.value,
        },
      });

      if ((roundResult === 'win' && player == Player.USER) || roundResult === 'even') {
        this.nextRound();
      }
    }
  }

  finishSession(): void {
    this.initRoundBoardState();
    this.currentSession$.next(null);
    this.currentSessionRound$.next(null);
  }

  private createNextSessionRoundObject(): Round {
    const currentRound = this.currentSessionRound$.value;
    return {
      id: currentRound ? currentRound.id + 1 : 1,
      turns: [],
    };
  }

  private checkRoundStatus(turnsToCheck: TurnRecord[], player: Player): 'continue' | 'even' | 'win' {
    // Check WIN
    const isWin = this.checkForWin(player);

    if (isWin) {
      return 'win';
    }

    // Check even
    if (turnsToCheck.length === FieldDimensions * FieldDimensions) {
      return 'even';
    }

    // Default
    return 'continue';
  }

  private initRoundBoardState(): void {
    const roundBoardState = Array(FieldDimensions * FieldDimensions).fill(null);

    if (!this.roundBoardState$) {
      this.roundBoardState$ = new BehaviorSubject(roundBoardState);
    } else {
      this.roundBoardState$.next(roundBoardState);
    }
  }

  private checkForWin(playerTurn: Player): boolean {
    // Row
    let rowCellsForPlayer = 0;

    for (let rowIndex = 0; rowIndex < FieldDimensions; rowIndex++) {
      if (rowCellsForPlayer === FieldDimensions) {
        return true;
      }
      rowCellsForPlayer = 0;
      for (let colIndex = 0; colIndex < FieldDimensions; colIndex++) {
        if (this.roundBoardState$.value[this.getCellIndex(rowIndex, colIndex)] !== playerTurn) {
          break;
        } else {
          ++rowCellsForPlayer;
        }
      }
    }

    if (rowCellsForPlayer === FieldDimensions) {
      return true;
    }
    // Column

    let colCellsForPlayer = 0;

    for (let colIndex = 0; colIndex < FieldDimensions; colIndex++) {
      if (colCellsForPlayer === FieldDimensions) {
        return true;
      }
      colCellsForPlayer = 0;
      for (let rowIndex = 0; rowIndex <= FieldDimensions - 1; rowIndex++) {
        if (this.roundBoardState$.value[this.getCellIndex(rowIndex, colIndex)] !== playerTurn) {
          break;
        } else {
          ++colCellsForPlayer;
        }
      }
    }

    if (colCellsForPlayer === FieldDimensions) {
      return true;
    }

    // 1st Diagonal
    let diagonalCellsForPlayer = 0;

    for (let colAndRowIndex = 0; colAndRowIndex < FieldDimensions; colAndRowIndex++) {
      if (this.roundBoardState$.value[this.getCellIndex(colAndRowIndex, colAndRowIndex)] !== playerTurn) {
        break;
      } else {
        ++diagonalCellsForPlayer;
      }
    }

    if (diagonalCellsForPlayer === FieldDimensions) {
      return true;
    }

    // 2nd Diagonal
    let secondDiagonalCellsForPlayer = 0;

    for (let colAndRowIndex = 0; colAndRowIndex < FieldDimensions; colAndRowIndex++) {
      if (
        this.roundBoardState$.value[this.getCellIndex(colAndRowIndex, FieldDimensions - 1 - colAndRowIndex)] !==
        playerTurn
      ) {
        break;
      } else {
        ++secondDiagonalCellsForPlayer;
      }
    }

    if (secondDiagonalCellsForPlayer === FieldDimensions) {
      return true;
    }

    return false;
  }

  private getCellIndex(row: number, column: number): number {
    return row * FieldDimensions + column;
  }
}
