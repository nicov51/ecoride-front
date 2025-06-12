import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

interface Ride {
  id: number;
  departureDate: Date;
  departurePlace: string;
  arrivalDate: Date;
  arrivalPlace: string;
  departureTime: string;
  arrivalTime: string;
  seats: number;
  price: number;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
}

@Component({
  selector: 'app-my-rides',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatIcon,
    DatePipe,
    MatCardActions,
    MatButton,
    NgIf,
    NgForOf
  ],
  templateUrl: './my-rides.component.html',
  styleUrl: './my-rides.component.css'
})
export class MyRidesComponent {

  rides: Ride[] = [
    {
      id: 1,
      departurePlace: 'Paris',
      arrivalPlace: 'Lyon',
      departureDate: new Date('2023-12-15'),
      arrivalDate: new Date('2023-12-15'),
      departureTime: '08:00',
      arrivalTime: '12:00',
      seats: 3,
      price: 15,
      status: 'planned'
    },
    {
      id: 2,
      departurePlace: 'Bordeaux',
      arrivalPlace: 'Toulouse',
      departureDate: new Date('2023-12-10'),
      arrivalDate: new Date('2023-12-10'),
      departureTime: '14:00',
      arrivalTime: '16:30',
      seats: 2,
      price: 10,
      status: 'completed'
    }
  ];

  startRide(id: number) {
    const ride = this.rides.find(item => item.id === id);
    if (ride) ride.status = 'in_progress';
  }

  completeRide(id: number) {
    const ride = this.rides.find(item => item.id === id);
    if (ride) ride.status = 'completed';
  }

  cancelRide(id: number) {
    const ride = this.rides.find(item => item.id === id);
    if (ride) ride.status = 'cancelled';
  }
}
