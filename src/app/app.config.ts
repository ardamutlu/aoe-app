import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideTitleStrategy } from './core/services/title.strategy';
import { provideErrorHandler } from './core/services/error-handler.service';
import { httpInterceptor } from './core/services/http.interceptor';
import { provideBreadcrumb } from './core/services/breadcrumb.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideErrorHandler(),
    provideTitleStrategy(),
    provideBreadcrumb(),
  ],
};
