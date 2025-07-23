import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrenotazioneListComponent } from './components/prenotazione-list/prenotazione-list.component';
import { PrenotazioneFormComponent } from './components/prenotazione-form/prenotazione-form.component';


const routes: Routes = [
  {path: '', component: PrenotazioneListComponent},
  {path: 'nuova', component: PrenotazioneFormComponent},
  {path: 'modifica/:id', component: PrenotazioneFormComponent },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
