import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreateEmployeeDto} from "../core/models/user/create-employee.dto";
import {UserDto} from "../core/models/user/user.dto";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {CreditStat} from "../core/models/others/credit-stat";
import {RideStat} from "../core/models/ride/ride-stat";

@Injectable()
export class AdminService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient)

  createEmployee(dto: CreateEmployeeDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/api/admin/employees`, dto);
  }

  getRideStats(): Observable<RideStat[]> {
    return this.http.get<RideStat[]>(`${this.apiUrl}/api/admin/stats/rides`);
  }

  getCreditStats(): Observable<CreditStat[]> {
    return this.http.get<CreditStat[]>(`${this.apiUrl}/api/admin/stats/credits`);
  }

  getTotalCredits() {
    return this.http.get<number>(`${this.apiUrl}/api/admin/stats/total-credits`);
  }

  suspendUser(id: number): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/api/admin/suspend/${id}`, {});
  }

  unsuspendUser(id: number): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/api/admin/unsuspended/${id}`, {});
  }
}
