export interface PrenotazioneModel {
  prenotazioneId?: number;
  giorno: string;
  ora: string;
  note?: string;
  nome: string;
  cognome: string;
  email: string;
  telefono?: string;
}
