import { Injectable, signal, computed, effect } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../core/models/user/User';
import { Observable, tap } from 'rxjs';
import { RegisterUserDto } from '../core/models/user/register-user.dto';
import { LoginResponse } from '../core/models/user/Login-response';
import { LoginCredentials } from '../core/models/user/Login-credentials';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly apiUrl = environment.apiUrl;

  // signal utilisateur courant
  currentUserSignal = signal<User | null>(null);

  constructor(private http: HttpClient) {
    // au démarrage, récupérer le token depuis localStorage
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      if (decoded?.email) {
        this.fetchUser(decoded.email);
      }
    }
  }

  register(userData: RegisterUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/api/users`, userData);
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/api/auth/login`,
      credentials,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
      }
    ).pipe(
      tap((response) => {
        this.setToken(response.access_token);
        const decoded = this.decodeToken(response.access_token);
        if (decoded?.email) {
          this.fetchUser(decoded.email);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSignal.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  isLogged = computed(() => !!this.currentUserSignal());

  private decodeToken(token: string): { email?: string } | null {
    try {
      return jwtDecode<{ email?: string }>(token);
    } catch {
      return null;
    }
  }

  private fetchUser(email: string) {
    this.http.get<User>(`${this.apiUrl}/api/users/email/${email}`)
      .subscribe({
        next: user => this.currentUserSignal.set(user),
        error: err => console.error('Erreur récupération utilisateur', err)
      });
  }
  public loadUserIfTokenPresent() {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      if (decoded?.email) {
        this.fetchUser(decoded.email);
      }
    }
  }
}

