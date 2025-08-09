import {inject, Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {RoleService} from "./role.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AdminService {
  private userService = inject(UserService)
  private roleService = inject(RoleService)
  private http = inject(HttpClient)

    // /admin/stats/rides
    //
    // /admin/stats/credits
    //
    // /admin/stats/total-credits
    //
    // /admin/employees (POST)
    //
    // /admin/suspend/:id
    //
    // /admin/unsuspend/:id

  async createEmployee() {}

  getRideStats() {
    return this.http.get<{ date: string; count: number }[]>('/api/admin/stats/rides');
  }

  getCreditStats() {
    return this.http.get<{ date: string; total: number }[]>('/api/admin/stats/credits');
  }

  getTotalCredits() {
    return this.http.get<number>('/api/admin/stats/total-credits');
  }

  getAllUsers() {
    return this.http.get<any[]>('/api/users'); // ou un endpoint dédié si besoin
  }

  suspendUser(id: number) {
    return this.http.post(`/api/admin/suspend/${id}`, {});
  }

  unsuspendUser(id: number) {
    return this.http.post(`/api/admin/unsuspend/${id}`, {});
  }
}
