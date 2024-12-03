import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter, withComponentInputBinding, withViewTransitions } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule)
  ],
};
