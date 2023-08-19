export interface SessionData {
  userTurnFirst: boolean;
  rounds: { [id: number]: Round };
}

export interface Round {
  id: number;
  turns: TurnRecord[];
  winner?: Player | 'even';
}

export interface TurnRecord {
  cellIndex: number;
  by: Player;
}

export enum Player {
  USER = 'user',
  AI = 'ai',
}
