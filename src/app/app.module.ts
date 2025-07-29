import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PrenotazioneListComponent } from './components/prenotazione-list/prenotazione-list.component';
import { PrenotazioneFormComponent } from './components/prenotazione-form/prenotazione-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ClientiListComponent } from './components/clienti-list/clienti-list.component';
import { ClientiFormComponent } from './components/clienti-form/clienti-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PrenotazioneListComponent,
    PrenotazioneFormComponent,
    ClientiListComponent,
    ClientiFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    FullCalendarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
