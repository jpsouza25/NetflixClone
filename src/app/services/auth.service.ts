import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private tokenKey = 'movieapp_token';
  public user$ = new BehaviorSubject<any>(null);

  apiUrl = environment.apiUrl;

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.user$.next(res.user);
      })
    );
  }

  register(email: string, password: string, name?: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/register`, { email, password, name }).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.user$.next(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.user$.next(null);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
