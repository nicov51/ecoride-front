import { Component } from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    NgForOf,
    MatIcon,
    MatIconButton,
    DatePipe
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {

  alerts = [
    {
      id: 1,
      icon: 'person_add',
      title: 'Nouvelle réservation',
      message: 'Jean Dupont a réservé votre trajet Paris-Lyon',
      date: new Date(),
      read: false
    },
    {
      id: 2,
      icon: 'warning',
      title: 'Trajet annulé',
      message: 'Votre trajet du 15/12 a été annulé par le conducteur',
      date: new Date(Date.now() - 3600000),
      read: false
    }
  ];

  markAsRead(id: number) {
    this.alerts = this.alerts.filter(item => item.id !== id);
    // En réel : appel API pour marquer comme lu
  }
}
