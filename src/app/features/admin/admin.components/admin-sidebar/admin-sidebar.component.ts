import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  links= signal([
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Utilisateurs', path: '/admin/users' },
    { label: 'Graphiques', path: '/admin/charts' },
  ])
}
