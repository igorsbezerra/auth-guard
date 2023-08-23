import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `http://localhost:3000`;

  constructor(private http: HttpClient, private router: Router) {}

  sign(payload: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ access_token: string }>(`${this.url}/sign`, payload)
      .pipe(
        map((response) => {
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['admin']);
        }),
        catchError((err) => {
          if (err.error.message) return throwError(() => err.error.message);
          return throwError(
            () => 'Falha na comunicacao, tente novamente mais tarde.'
          );
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return false;
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(accessToken);
  }
}
