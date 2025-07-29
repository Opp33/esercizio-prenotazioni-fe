import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from '../../models/cliente.model';

@Component({
  selector: 'app-clienti-form',
  templateUrl: './clienti-form.component.html',
  styleUrl: './clienti-form.component.css'
})
export class ClientiFormComponent {
  clienteForm!: FormGroup;
  minDate: string = '';
  isEditMode = false;
  clienteId!: number;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      telefono: [''],
    });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.clienteId = +idParam;
        this.caricacliente(this.clienteId);
      }
    });
  }

  caricacliente(id: number): void {
    this.clienteService.getclientiById (id).subscribe({
      next: (cliente) => {
        this.clienteForm.patchValue({
          nome: cliente.nome,
          cognome: cliente.cognome,
          email: cliente.email,
          telefono: cliente.telefono,
        });
      },
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const formValues = this.clienteForm.value;

      const clienteData: ClienteModel = {
        nome: formValues.nome,
        cognome: formValues.cognome,
        email: formValues.email,
        telefono: formValues.telefono,
      };

      if (this.isEditMode) {
        this.clienteService
          .modificacliente(this.clienteId, clienteData)
          .subscribe({
            next: () => {
              alert('Cliente aggiornato con successo!');
              this.router.navigate(['/clienti']);
            },
          });
      } else {
        this.clienteService.creacliente(clienteData).subscribe({
          next: () => {
            alert('Cliente creato con successo!');
            this.router.navigate(['/clienti']);
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/clienti']);
  }

  onDelete(): void {
    if (
      this.isEditMode &&
      confirm('Sei sicuro di voler eliminare questo cliente? Tutte le prenotazioni collegate andranno perse.')
    ) {
      this.clienteService
        .eliminacliente(this.clienteId)
        .subscribe({
          next: () => {
            this.router.navigate(['/clienti']);
          },
        });
    }
  }
}
