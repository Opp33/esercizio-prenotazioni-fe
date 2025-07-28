import { Component } from '@angular/core';
import { UtenteService } from '../../services/utente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteModel } from '../../models/utente.model';

@Component({
  selector: 'app-utenti-form',
  templateUrl: './utenti-form.component.html',
  styleUrl: './utenti-form.component.css'
})
export class UtentiFormComponent {
  utenteForm!: FormGroup;
  minDate: string = '';
  isEditMode = false;
  utenteId!: number;

  constructor(
    private fb: FormBuilder,
    private utenteService: UtenteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.utenteForm = this.fb.group({
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
      giorno: ['', Validators.required],
      ora: ['', Validators.required],
      note: [''],
    });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.utenteId = +idParam;
        this.caricaUtente(this.utenteId);
      }
    });
  }

  caricaUtente(id: number): void {
    this.utenteService.getUtentiById (id).subscribe({
      next: (utente) => {
        this.utenteForm.patchValue({
          nome: utente.nome,
          cognome: utente.cognome,
          email: utente.email,
          telefono: utente.telefono,
        });
      },
    });
  }

  onSubmit(): void {
    if (this.utenteForm.valid) {
      const formValues = this.utenteForm.value;

      const utenteData: UtenteModel = {
        nome: formValues.nome,
        cognome: formValues.cognome,
        email: formValues.email,
        telefono: formValues.telefono,
      };

      if (this.isEditMode) {
        this.utenteService
          .modificaUtente(this.utenteId, utenteData)
          .subscribe({
            next: () => {
              alert('Utente aggiornato con successo!');
              this.router.navigate(['/utenti']);
            },
          });
      } else {
        this.utenteService.creaUtente(utenteData).subscribe({
          next: () => {
            alert('Utente creato con successo!');
            this.router.navigate(['/utenti']);
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/utenti']);
  }

  onDelete(): void {
    if (
      this.isEditMode &&
      confirm('Sei sicuro di voler eliminare questo utente?')
    ) {
      this.utenteService
        .eliminaUtente(this.utenteId)
        .subscribe({
          next: () => {
            this.router.navigate(['/utenti']);
          },
        });
    }
  }
}
