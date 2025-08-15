import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from '../core/models/user/User';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { RegisterUserDto } from '../core/models/user/register-user.dto';
import { LoginResponse } from '../core/models/user/Login-response';
import { LoginCredentials } from '../core/models/user/Login-credentials';
import { jwtDecode } from 'jwt-decode';
import {TokenService} from "./token.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  // signal utilisateur courant
  private currentUser = signal<User | null>(null);
  currentUserSignal = this.currentUser.asReadonly();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
   this.loadUserIfTokenPresent();
  }
  refreshUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/users/current`).pipe(
      tap({
        next: user => this.currentUser.set(user),
        error: () => this.clearAuthState()
      })
    );
  }

  register(userData: RegisterUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/api/users`, userData).pipe(
      tap(response => {
        // Après inscription, le backend attribue automatiquement le rôle Passenger
        this.refreshUser().subscribe();
      })
    )
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    // On nettoie TOUJOURS l'état avant un nouveau login
   this.clearAuthState();

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/api/auth/login`, credentials).pipe(
      tap((response) => {
        // stocke le token
        this.tokenService.setToken(response.access_token);
        //verifie le token
        const decoded = this.decodeToken(response.access_token);
        if (!decoded?.email) {
          throw new Error('Token invalide : email manquant');
        }
        // stocke l'user de la reponse avec les roles
        this.currentUser.set(response.user);
        //debug
        console.log('User après login:', response.user);

      }),
      // Si le login échoue, on nettoie
      catchError((err: HttpErrorResponse) => {
        this.clearAuthState();
        return throwError(() => new Error(err.message));
      })
    );
  }
  // Nouvelle méthode pour centraliser le nettoyage
  private clearAuthState() {
    this.tokenService.removeToken();
    this.currentUser.set(null);
  }
  logout() {
    this.tokenService.removeToken();
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }

  isLogged = computed(() => !!this.currentUser());

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
        next: user => {
          console.log('User reçu du backend:', user); // Debug complet
          console.log('User roles:', user?.roles);
          this.currentUser.set(user);
        },
        error: err => console.error('Erreur récupération utilisateur', err)
      });
  }
  loadUserIfTokenPresent() {
    const token = this.tokenService.getToken();
    if (token && !this.currentUser()) {
      // Seulement si l'user n'est pas déjà chargé
      this.refreshUser().subscribe();
    }
  }
}

