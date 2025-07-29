import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteModel } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  
  private apiUrl = 'http://localhost:8080/api/clienti';

  constructor(private http: HttpClient) {}

  getclienti(): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>(this.apiUrl);
  }

  getclientiById(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.apiUrl}/${id}`);
  }

  creacliente(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(this.apiUrl, cliente);
  }

  modificacliente(id: number, cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`${this.apiUrl}/${id}`, cliente);
  }

  eliminacliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
