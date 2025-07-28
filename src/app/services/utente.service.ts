import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtenteModel } from '../models/utente.model';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  
  private apiUrl = 'http://localhost:8080/api/utenti';

  constructor(private http: HttpClient) {}

  getUtenti(): Observable<UtenteModel[]> {
    return this.http.get<UtenteModel[]>(this.apiUrl);
  }

  getUtentiById(id: number): Observable<UtenteModel> {
    return this.http.get<UtenteModel>(`${this.apiUrl}/${id}`);
  }

  creaUtente(utente: UtenteModel): Observable<UtenteModel> {
    return this.http.post<UtenteModel>(this.apiUrl, utente);
  }

  modificaUtente(id: number, utente: UtenteModel): Observable<UtenteModel> {
    return this.http.put<UtenteModel>(`${this.apiUrl}/${id}`, utente);
  }

  eliminaUtente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
