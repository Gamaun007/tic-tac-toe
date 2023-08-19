import { TestBed } from '@angular/core/testing';

import { AiBotPlayerService } from './ai-bot-player.service';

describe('AiBotPlayerService', () => {
  let service: AiBotPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiBotPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
