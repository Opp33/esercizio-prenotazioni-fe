export interface PrenotazioneModel {
  id?: number;
  nome: string;
  email: string;
  telefono?: string;
  giorno: string;  // yyyy-MM-dd
  ora: string;     // HH:mm
  note?: string;
}