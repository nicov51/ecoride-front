import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-employees-sidebar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './employees-sidebar.component.html',
  styleUrl: './employees-sidebar.component.css'
})
export class EmployeesSidebarComponent {
links = signal([
  { label: 'Modération', path: '/employees/moderation', icon: 'rate_review' },
  { label: 'Signalements', path: '/employees/signalements', icon: 'warning' },
  { label: 'Guide', path: '/employees/guide', icon: 'help' },
  { label: 'Statistiques', path: '/employees/stats', icon: 'bar_chart' },
])
}
