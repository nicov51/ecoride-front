import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../core/models/user/User";
import {Observable} from "rxjs";
import {RegisterUserDto} from "../core/models/user/register-user.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY: string = 'token';

  constructor(private http: HttpClient) {}

  login(token:string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  register(data: RegisterUserDto): Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}/api/users`, data);
  }
}
