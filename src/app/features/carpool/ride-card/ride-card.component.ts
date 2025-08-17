import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Ride} from "../../../core/models/ride/ride";
import {DatePipe, DecimalPipe} from "@angular/common";
import {getAvailableSeats} from "../../../shared/utils/ride.utils";

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatButton,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.css'
})
export class RideCardComponent {
  @Input({ required: true }) ride!: Ride;
  @Output() viewDetails = new EventEmitter<Ride>(); // Émet l'objet Ride complet
  @Output() joinRide = new EventEmitter<number>(); // Pour rejoindre le trajet

  getAvailableSeats = getAvailableSeats;

  onViewDetails() {
    this.viewDetails.emit(this.ride); // Envoie tout l'objet Ride
  }
}
