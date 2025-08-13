import {Component, inject} from '@angular/core';
import {AdminService} from "../../../../services/admin.service";
import {AdminEmployeesCardComponent} from "../admin-employees-card/admin-employees-card.component";
import {AdminEmployeesCreateComponent} from "../admin-employees-create/admin-employees-create.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  imports: [AdminEmployeesCardComponent, AdminEmployeesCreateComponent, AsyncPipe],
  templateUrl: './admin-employees-list.component.html',
  styleUrl: './admin-employees-list.component.css'
})
export class AdminEmployeesListComponent {
private adminService = inject(AdminService);

employees$ = this.adminService.getEmployees();

onSuspend(id: number) {
  this.adminService.suspendUser(id).subscribe(() => this.loadEmployees());
}
onUnsuspend(id: number) {
  this.adminService.unsuspendUser(id).subscribe(() => this.loadEmployees());
}

loadEmployees() {
  this.employees$ = this.adminService.getEmployees();
}
}
