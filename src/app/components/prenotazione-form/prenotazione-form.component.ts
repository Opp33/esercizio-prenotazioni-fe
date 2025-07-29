import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneModel } from '../../models/prenotazione.model';
import { ClienteModel } from '../../models/cliente.model';

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
  suggerimenti: ClienteModel[] = [];
  campoAttivo: string = '';

  constructor(
    private fb: FormBuilder,
    private prenotazioneService: PrenotazioneService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.prenotazioneForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      telefono: [''],
      giorno: ['', [Validators.required, this.minDateValidator(this.minDate)]],
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

  minDateValidator(minDateStr: string) {
  return (control: any) => {
    if (!control.value) return null;

    const inputDate = new Date(control.value);
    const minDate = new Date(minDateStr);

    return inputDate < minDate ? { minDate: true } : null;
  };
}


  caricaPrenotazione(id: number): void {
    this.prenotazioneService.getPrenotazioneById(id).subscribe({
      next: (prenotazione) => {
        this.prenotazioneForm.patchValue({
          nome: prenotazione.cliente.nome,
          cognome: prenotazione.cliente.cognome,
          email: prenotazione.cliente.email,
          telefono: prenotazione.cliente.telefono,
          giorno: prenotazione.giorno,
          ora: prenotazione.ora,
          note: prenotazione.note,
        });
      },
    });
  }

  onFieldInput(campo: string): void {
    this.campoAttivo = campo;
    const valore = this.prenotazioneForm.get(campo)?.value;

    if (valore && valore.length >= 2) {
      this.prenotazioneService.cercaClienti(valore, campo).subscribe({
        next: (clienti) => {
          this.suggerimenti = clienti;
        },
      });
    } else {
      this.suggerimenti = [];
    }
  }

  onClienteSelected(cliente: ClienteModel): void {
    this.prenotazioneForm.patchValue({
      nome: cliente.nome,
      cognome: cliente.cognome,
      email: cliente.email,
      telefono: cliente.telefono,
    });
    this.suggerimenti = [];
  }

  onSubmit(): void {
    if (this.prenotazioneForm.valid) {
      const formValues = this.prenotazioneForm.value;

      const prenotazioneData: PrenotazioneModel = {
        giorno: formValues.giorno,
        ora: formValues.ora,
        note: formValues.note,
        cliente: {
          nome: formValues.nome,
          cognome: formValues.cognome,
          email: formValues.email,
          telefono: formValues.telefono,
        } as ClienteModel,
      };

      if (this.isEditMode) {
        this.prenotazioneService
          .modificaPrenotazione(this.prenotazioneId, prenotazioneData)
          .subscribe({
            next: () => {
              alert('Prenotazione aggiornata con successo!');
              this.router.navigate(['/prenotazioni']);
            },
          });
      } else {
        this.prenotazioneService.creaPrenotazione(prenotazioneData).subscribe({
          next: () => {
            alert('Prenotazione creata con successo!');
            this.router.navigate(['/prenotazioni']);
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/prenotazioni']);
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
            this.router.navigate(['/prenotazioni']);
          },
        });
    }
  }
}
