import { Component, OnInit } from '@angular/core';
import { PrenotazioneModel } from '../../models/prenotazione.model';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prenotazione-list',
  templateUrl: './prenotazione-list.component.html',
  styleUrl: './prenotazione-list.component.css',
})
export class PrenotazioneListComponent implements OnInit {
  prenotazioni: PrenotazioneModel[] = [];

  constructor(private prenotazioneService: PrenotazioneService, private router: Router) {}

  ngOnInit(): void {
    this.loadPrenotazioni();
  }

  loadPrenotazioni(): void {
      this.prenotazioneService.getPrenotazioni().subscribe((data) => {
        this.prenotazioni = data;
      });
    }

  editPrenotazione(prenotazione: PrenotazioneModel): void {
    this.router.navigate(['modifica-prenotazione', prenotazione.prenotazioneId]);
  }
}
