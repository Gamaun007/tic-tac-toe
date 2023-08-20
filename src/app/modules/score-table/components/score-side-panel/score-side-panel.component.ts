import { Component, OnInit } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Score } from 'src/app/data/models';
import { GameSessionHelperService } from 'src/app/shared/modules/tic-tac-toe/services/game-session-helper/game-session-helper.service';
import { ScoreFacadeService } from 'src/app/shared/modules/tic-tac-toe/services/score-facade/score-facade.service';

@Component({
  selector: 'app-score-side-panel',
  templateUrl: './score-side-panel.component.html',
  styleUrls: ['./score-side-panel.component.scss'],
})
export class ScoreSidePanelComponent implements OnInit {
  constructor(private scoreFacade: ScoreFacadeService, private gameSessionHelper: GameSessionHelperService) {}

  topScores$: Observable<Score[]>;
  sessionId$: Observable<string>;

  trackByItemsRef = this.trackByItems.bind(this);

  ngOnInit(): void {
    this.topScores$ = this.scoreFacade.getScore();
    this.sessionId$ = this.gameSessionHelper.Session.pipe(map((session) => session?.session_id));
  }

  trackByItems(index: number, item: Score): string {
    return item.session_id;
  }
}
