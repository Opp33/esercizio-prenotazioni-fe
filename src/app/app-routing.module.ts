import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrenotazioneListComponent } from './components/prenotazione-list/prenotazione-list.component';
import { PrenotazioneFormComponent } from './components/prenotazione-form/prenotazione-form.component';
import { ClientiListComponent } from './components/clienti-list/clienti-list.component';
import { ClientiFormComponent } from './components/clienti-form/clienti-form.component';


const routes: Routes = [
  {path: 'prenotazioni', component: PrenotazioneListComponent},
  {path: 'nuova-prenotazione', component: PrenotazioneFormComponent},
  {path: 'modifica-prenotazione/:id', component: PrenotazioneFormComponent },
  {path: 'clienti', component: ClientiListComponent },
  {path: 'modifica-cliente/:id', component: ClientiFormComponent },
  {path: 'nuovo-cliente', component: ClientiFormComponent },
  {path: '**', redirectTo: 'prenotazioni'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
