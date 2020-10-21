import { Injectable } from '@angular/core';

import { PiConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService<T extends PiConfig = PiConfig> {
  static appConfig: PiConfig;

  constructor() {}

  static loadConfig(): Promise<object> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      // path is relative to the apps index.html file
      xhr.open('GET', './config.json');

      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          ConfigurationService.appConfig = {
            ...JSON.parse(xhr.responseText),
            mapbox: {
              accessToken: undefined
            }
          };
          resolve();
        } else if (xhr.readyState === XMLHttpRequest.DONE) {
          reject();
        }
      });
      xhr.send(null);
    });
  }

  getConfig(): any {
    return ConfigurationService.appConfig as T;
  }
}
