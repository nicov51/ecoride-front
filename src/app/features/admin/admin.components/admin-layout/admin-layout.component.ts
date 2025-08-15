import {Component} from '@angular/core';
import { RouterOutlet} from "@angular/router";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";
import {AdminService} from "../../../../services/admin.service";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    RouterOutlet
  ],
  providers: [AdminService],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
}
