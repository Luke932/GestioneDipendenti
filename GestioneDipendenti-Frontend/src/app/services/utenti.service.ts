import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  getAllUtenti(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/`);
  }

  saveUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admin/inserimento/user`, payload);
  }

  saveAdmin(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admin/inserimento/admin`, payload);
  }

  updateUser(userId: any, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}admin/modifica/${userId}`, payload);
  }

  deleteUser(userId: any) {
    return this.http.delete(`${this.baseUrl}admin/elimina/${userId}`);
  }
}
