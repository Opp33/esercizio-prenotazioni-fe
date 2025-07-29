import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrenotazioneModel } from '../models/prenotazione.model';
import { Observable } from 'rxjs';
import { ClienteModel } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private apiUrl = 'http://localhost:8080/api/prenotazioni';

  constructor(private http: HttpClient) { }

  getPrenotazioni(): Observable<PrenotazioneModel[]> {
    return this.http.get<PrenotazioneModel[]>(this.apiUrl);
  }

  getPrenotazioneById(id: number): Observable<PrenotazioneModel> {
    return this.http.get<PrenotazioneModel>(`${this.apiUrl}/${id}`);
  }

  creaPrenotazione(prenotazione: PrenotazioneModel): Observable<PrenotazioneModel> {
    return this.http.post<PrenotazioneModel>(this.apiUrl, prenotazione);
  }

  modificaPrenotazione(id: number, prenotazione: PrenotazioneModel): Observable<PrenotazioneModel> {
    return this.http.put<PrenotazioneModel>(`${this.apiUrl}/${id}`, prenotazione);
  }

  eliminaPrenotazione(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  cercaClienti(term: string, field: string): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>(`http://localhost:8080/api/clienti/autocomplete?term=${term}&field=${field}`);
  }

}
