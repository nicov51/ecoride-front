import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Role} from "../core/models/user/role";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {CreateRoleDto} from "../core/models/user/create-role.dto";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.apiUrl}/api/role`);
  }
  create(role: CreateRoleDto): Observable<Role> {
    return this.http.post<Role>(`${environment.apiUrl}/api/role`, role);
  }
}
