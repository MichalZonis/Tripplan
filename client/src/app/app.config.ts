import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthenticationService } from './authentication.service';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), AuthenticationService, provideHttpClient(), CookieService]
};
