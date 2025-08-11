import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../core/models/user/User";
import {environment} from "../../environments/environment";
import {UserDto} from "../core/models/user/user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getUserByEmail( email: string ): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/users/email/${email}`)
  }
  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/api/users`);
  }
}
