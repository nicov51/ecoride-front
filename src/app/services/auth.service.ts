import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../core/models/user/User";
import {Observable, tap} from "rxjs";
import {RegisterUserDto} from "../core/models/user/register-user.dto";
import {LoginResponse} from "../core/models/user/Login-response";
import {LoginCredentials} from "../core/models/user/Login-credentials";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY: string = 'token';
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  register(userData: RegisterUserDto): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/users`, userData);
  }
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/api/auth/login`,
      credentials,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    // stocker dans un BehaviorSubject pour un accès réactif ?
  }


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
