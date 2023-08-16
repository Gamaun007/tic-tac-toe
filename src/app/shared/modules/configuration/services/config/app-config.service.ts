import { Inject, Injectable, InjectionToken } from '@angular/core';
import { EnvironmentConfig } from '../../models';

export const APP_CONFIG = new InjectionToken('app-config');

@Injectable()
export class AppConfigService {
  constructor(@Inject(APP_CONFIG) private configFile: EnvironmentConfig) {}

  get config(): EnvironmentConfig {
    return this.configFile;
  }
}
