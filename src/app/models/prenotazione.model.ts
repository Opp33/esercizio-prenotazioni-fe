import { ClienteModel } from "./cliente.model";

export interface PrenotazioneModel {
  prenotazioneId?: number;
  giorno: string;
  ora: string;
  note?: string;
  cliente: ClienteModel;
}
