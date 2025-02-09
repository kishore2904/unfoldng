import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient(),

    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyCRyg07OB9qQTTuGnUsjQ0_bGxlc2kvxn0",
      authDomain: "unfold-fit.firebaseapp.com",
      projectId: "unfold-fit",
      storageBucket: "unfold-fit.firebasestorage.app",
      messagingSenderId: "507766853707",
      appId: "1:507766853707:web:e4149269fb39925411bdce",
      measurementId: "G-BZNLF9MGE6"
    })),

    // Directly use provideStorage
    provideStorage(() => getStorage()),

    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
