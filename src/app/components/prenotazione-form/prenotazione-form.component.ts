import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneModel } from '../../models/prenotazione.model';

@Component({
  selector: 'app-prenotazione-form',
  templateUrl: './prenotazione-form.component.html',
  styleUrl: './prenotazione-form.component.css',
})
export class PrenotazioneFormComponent implements OnInit {
  prenotazioneForm!: FormGroup;
  minDate: string = '';
  isEditMode = false;
  prenotazioneId!: number;

  constructor(
    private fb: FormBuilder,
    private prenotazioneService: PrenotazioneService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.prenotazioneForm = this.fb.group({
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
        this.prenotazioneId = +idParam;
        this.caricaPrenotazione(this.prenotazioneId);
      }
    });
  }

  caricaPrenotazione(id: number): void {
    this.prenotazioneService.getPrenotazioneById(id).subscribe({
      next: (prenotazione) => {
        this.prenotazioneForm.patchValue({
          nome: prenotazione.nome,
          cognome: prenotazione.cognome,
          email: prenotazione.email,
          telefono: prenotazione.telefono,
          giorno: prenotazione.giorno,
          ora: prenotazione.ora,
          note: prenotazione.note,
        });
      },
    });
  }

  onSubmit(): void {
    if (this.prenotazioneForm.valid) {
      const formValues = this.prenotazioneForm.value;

      const prenotazioneData: PrenotazioneModel = {
        giorno: formValues.giorno,
        ora: formValues.ora,
        note: formValues.note,
        nome: formValues.nome,
        cognome: formValues.cognome,
        email: formValues.email,
        telefono: formValues.telefono,
      };

      if (this.isEditMode) {
        this.prenotazioneService
          .modificaPrenotazione(this.prenotazioneId, prenotazioneData)
          .subscribe({
            next: () => {
              alert('Prenotazione aggiornata con successo!');
              this.router.navigate(['/']);
            },
          });
      } else {
        this.prenotazioneService.creaPrenotazione(prenotazioneData).subscribe({
          next: () => {
            alert('Prenotazione creata con successo!');
            this.router.navigate(['/']);
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onDelete(): void {
    if (
      this.isEditMode &&
      confirm('Sei sicuro di voler eliminare questa prenotazione?')
    ) {
      this.prenotazioneService
        .eliminaPrenotazione(this.prenotazioneId)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
        });
    }
  }
}
