import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthenticationService } from './authentication.service';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), AuthenticationService, provideHttpClient(), CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '431094013601-u10s6e3ltgrfe7st720uv19tjh10s354.apps.googleusercontent.com'
              )
          }
        ]
      }
    }]
};
