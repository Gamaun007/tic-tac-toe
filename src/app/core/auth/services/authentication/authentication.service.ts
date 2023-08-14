import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() { }

  isAuthenticatedAsync(): Promise<boolean> {
    // Stub
    return Promise.resolve(true);
  }
}
