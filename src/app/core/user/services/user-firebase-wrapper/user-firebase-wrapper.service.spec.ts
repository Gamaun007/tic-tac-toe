import { TestBed } from '@angular/core/testing';

import { UserFirebaseWrapperService } from './user-firebase-wrapper.service';

describe('UserFirebaseWrapperService', () => {
  let service: UserFirebaseWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFirebaseWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
