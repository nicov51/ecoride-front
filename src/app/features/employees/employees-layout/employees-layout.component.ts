import { Component } from '@angular/core';
import {EmployeesSidebarComponent} from "../employees-sidebar/employees-sidebar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-employees-layout',
  standalone: true,
  imports: [
    EmployeesSidebarComponent,
    RouterOutlet
  ],
  templateUrl: './employees-layout.component.html',
  styleUrl: './employees-layout.component.css'
})
export class EmployeesLayoutComponent {

}
