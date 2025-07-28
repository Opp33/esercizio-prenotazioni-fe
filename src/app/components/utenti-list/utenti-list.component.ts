import { Component } from '@angular/core';
import { UtenteModel } from '../../models/utente.model';
import { UtenteService } from '../../services/utente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utenti-list',
  templateUrl: './utenti-list.component.html',
  styleUrl: './utenti-list.component.css',
})
export class UtentiListComponent {
  utenti: UtenteModel[] = [];

  constructor(private utenteService: UtenteService, private router: Router) {}

  ngOnInit(): void {
    this.loadUtenti();
  }

  loadUtenti(): void {
    this.utenteService.getUtenti().subscribe((data) => {
      this.utenti = data;
    });
  }

  editUtente(utente: UtenteModel): void {
    this.router.navigate(['modifica-utente', utente.utenteId]);
  }
}
