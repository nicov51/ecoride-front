import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    RouterOutlet
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
}
