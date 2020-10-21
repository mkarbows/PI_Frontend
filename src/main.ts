import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ConfigurationService } from './app/core/configuration.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
ConfigurationService.loadConfig().then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
