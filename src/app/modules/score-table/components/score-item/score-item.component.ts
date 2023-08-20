import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map, of, BehaviorSubject, combineLatest, distinctUntilChanged, switchMap } from 'rxjs';
import { UserFacadeService } from 'src/app/core/user/services';
import { Score } from 'src/app/data/models';

@Component({
  selector: 'app-score-item',
  templateUrl: './score-item.component.html',
  styleUrls: ['./score-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreItemComponent implements OnChanges, OnInit {
  @Input()
  sessionId: string;

  @Input()
  scoreItem: Score;

  displayName$: Observable<string>;
  isCurrentUserScore$: Observable<boolean>;
  isCurrentSessionScore$ = new BehaviorSubject<boolean>(undefined);
  scoreItemChanges$ = new BehaviorSubject<Score>(undefined);
  nameHighlight$: Observable<boolean>;

  constructor(private userFacade: UserFacadeService) {}

  ngOnInit(): void {
    this.isCurrentUserScore$ = combineLatest([this.scoreItemChanges$, this.userFacade.getCurrentUser()]).pipe(
      map(([item, user]) => item.uid === user?.uid)
    );

    const combined = combineLatest([this.isCurrentUserScore$, this.isCurrentSessionScore$]).pipe(
      distinctUntilChanged()
    );

    this.nameHighlight$ = combined.pipe(
      map(([isCurrentUserScore, isCurrentSessionScore]) => {
        return (
          (isCurrentUserScore && isCurrentSessionScore) ||
        // Means it is the score of current 'guest'
          (!this.scoreItem?.uid && !isCurrentUserScore && isCurrentSessionScore)
        );
      })
    );

    this.displayName$ = combined.pipe(
      switchMap(([isCurrentUserScore, isCurrentSessionScore]) => {
        // Means it is the score of current 'guest'
        if (!this.scoreItem?.uid && !isCurrentUserScore && isCurrentSessionScore) {
          return of('Your score');
        }

        return this.userFacade.getUserByUid(this.scoreItem.uid).pipe(map((user) => user.name));
      })
    );
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if ('scoreItem' in changes) {
      if (changes['scoreItem'].firstChange) {
        this.isCurrentUserScore$ = this.userFacade
          .getCurrentUser()
          .pipe(map((user) => user?.uid === this.scoreItem.uid));
      }
      if (this.scoreItem) {
        this.scoreItemChanges$.next(this.scoreItem);
      }
    }
    this.isCurrentSessionScore$.next(this.scoreItem.session_id === this.sessionId);
  }
}
