import { EnvironmentConfig } from '../app/shared/modules/configuration/models';

export const configWrapper = {
  config: {} as EnvironmentConfig,
};

export async function initConfigAsync(): Promise<void> {
  const response: Response = await fetch('assets/env.config.json');
  const encodedBody = await response?.body?.getReader().read();
  const json = new TextDecoder().decode(encodedBody?.value);
  const parsedConfig: EnvironmentConfig = JSON.parse(json);
  configWrapper.config = parsedConfig;
}
