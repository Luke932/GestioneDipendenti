// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseURL;
  private loggedIn = false;
  private userRoles: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };

    return this.http.post<any>(`${this.apiUrl}auth/`, loginData).pipe(
      map(response => {
        console.log('Server Response:', response);

        if (response != null) {
          this.loggedIn = true;
          this.userRoles = response.ruolo || [];
          const username = response.username;
          localStorage.setItem('username', username);
          const id = response.idUtente;
          localStorage.setItem('id',id);

          if (this.hasRoles(['ADMIN'])) {
            this.router.navigate(['/admin/utenti']);
          } else if (this.hasRoles(['USER'])) {
            this.router.navigate(['/user/home']);
          }

          return true;
        } else {


          this.loggedIn = false;
          return false;
        }
      }),
      catchError(() => {
        this.loggedIn = false;
        return of(false);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  hasRoles(requiredRoles: string[]): boolean {
    return requiredRoles.some(role => this.userRoles.includes(role));
  }
}
