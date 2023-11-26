import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthenticationService } from './authentication.service';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './AuthGuard';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()]
  providers: [provideRouter(routes), AuthenticationService, provideHttpClient(), AuthGuard]
};
