import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import { Notification} from "../../../../../core/models/others/notification";
import {NotificationsService} from "../../../../../services/notifications.service";

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    DatePipe,
    NgForOf
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent implements OnInit {
  private notificationsService = inject(NotificationsService);
  loading: boolean = true;
  notifications: Notification[] = [];

  ngOnInit() {
    this.loadNotifications();
  }

  private loadNotifications() {
    this.notificationsService.getUserNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des notifications', err);
        this.loading = false;
      }
    })
  }
  markAsRead(id: number) {
    this.notificationsService.markAsRead(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(notif => notif.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des notifications', err);
      }
    })
  }
  getIcon(type: string): string {
    switch (type) {
      case 'REVIEW_SUBMITTED': return 'rate_review';
      case 'REVIEW_REJECTED': return 'cancel';
      case 'REVIEW_APPROVED': return 'check_circle';
      default: return 'notifications';
    }
  }
}
