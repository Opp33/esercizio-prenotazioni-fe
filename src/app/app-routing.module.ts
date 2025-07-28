import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrenotazioneListComponent } from './components/prenotazione-list/prenotazione-list.component';
import { PrenotazioneFormComponent } from './components/prenotazione-form/prenotazione-form.component';
import { UtentiListComponent } from './components/utenti-list/utenti-list.component';
import { UtentiFormComponent } from './components/utenti-form/utenti-form.component';


const routes: Routes = [
  {path: 'prenotazioni', component: PrenotazioneListComponent},
  {path: 'nuova-prenotazione', component: PrenotazioneFormComponent},
  {path: 'modifica-prenotazione/:id', component: PrenotazioneFormComponent },
  {path: 'utenti', component: UtentiListComponent },
  {path: 'modifica-utente/:id', component: UtentiFormComponent },
  {path: 'nuovo-utente', component: UtentiFormComponent },
  {path: '**', redirectTo: 'prenotazioni'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
