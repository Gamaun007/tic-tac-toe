import { TestBed } from '@angular/core/testing';

import { ScoreFacadeService } from './score-facade.service';

describe('ScoreFacadeService', () => {
  let service: ScoreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
