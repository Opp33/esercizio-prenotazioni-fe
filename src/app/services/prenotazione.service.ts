import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrenotazioneModel } from '../models/prenotazione.model';
import { Observable } from 'rxjs';

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

  aggiornaPrenotazione(id: number, prenotazione: PrenotazioneModel): Observable<PrenotazioneModel> {
    return this.http.put<PrenotazioneModel>(`${this.apiUrl}/${id}`, prenotazione);
  }

  eliminaPrenotazione(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  orderPrenotazioniByGiorno(): Observable<PrenotazioneModel[]> {
    return this.http.get<PrenotazioneModel[]>(`${this.apiUrl}/ordinamento/giorno`);
  }

  orderPrenotazioniByNome(): Observable<PrenotazioneModel[]> {
    return this.http.get<PrenotazioneModel[]>(`${this.apiUrl}/ordinamento/nome`);
  }
}
