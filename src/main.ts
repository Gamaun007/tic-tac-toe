import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initConfigAsync } from './configurations/init-config.function';


initConfigAsync()
  .then(() => import('./app/app.module')) 
  .then((x) => platformBrowserDynamic().bootstrapModule(x.AppModule))
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
