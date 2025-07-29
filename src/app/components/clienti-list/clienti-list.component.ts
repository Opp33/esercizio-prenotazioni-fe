import { Component } from '@angular/core';
import { ClienteModel } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clienti-list',
  templateUrl: './clienti-list.component.html',
  styleUrl: './clienti-list.component.css',
})
export class ClientiListComponent {
  clienti: ClienteModel[] = [];

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.loadclienti();
  }

  loadclienti(): void {
    this.clienteService.getclienti().subscribe((data) => {
      this.clienti = data;
    });
  }

  editcliente(cliente: ClienteModel): void {
    this.router.navigate(['modifica-cliente', cliente.clienteId]);
  }
}
