import { TestBed } from '@angular/core/testing';

import { GameSessionHelperService } from './game-session-helper.service';

describe('GameSessionHelperService', () => {
  let service: GameSessionHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSessionHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
