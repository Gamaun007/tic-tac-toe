import { Injectable } from '@angular/core';
import { Player } from '../../models/game-session.models';

@Injectable()
export class AiPlayerService {
  makeMove(board: (Player | null)[]): number {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        emptyCells.push(i);
      }
    }
    
    if (emptyCells.length === 0) {
      return -1; // No available move
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }
}