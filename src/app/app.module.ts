import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAWMWnmwJsdgGp9dak1l1h5YgyYUnM4Aw0",
      authDomain: "iglesia-6f3c7.firebaseapp.com",
      projectId: "iglesia-6f3c7",
      storageBucket: "iglesia-6f3c7.appspot.com",
      messagingSenderId: "951959748197",
      appId: "1:951959748197:web:f3c711af5288add3e6108c"

    })),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
