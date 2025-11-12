import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular, IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, HttpClientModule),
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideIonicAngular(),
        provideRouter(routes)
    ]
})
  .catch(err => console.log(err));
