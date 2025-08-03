import {Component, computed, Inject, input, output, signal} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, NgForOf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {Ride} from "../../../core/models/ride/ride";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from "../../../core/models/user/User";

@Component({
  selector: 'app-ride-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    NgOptimizedImage,
    MatCardContent,
    MatCardActions,
    DatePipe,
    MatButton,
    MatIcon,
    MatDivider,
    NgForOf,
    TitleCasePipe,
    MatIconButton
  ],
  templateUrl: './ride-details.component.html',
  styleUrl: './ride-details.component.css'
})
export class RideDetailsComponent {
  ecoFriendly = signal(false); // Pour future implémentation éco-score
  constructor(@Inject(MAT_DIALOG_DATA) public data: { ride: Ride },
              private dialogRef: MatDialogRef<RideDetailsComponent>
              ) {
    // Détermine si le véhicule est écologique
    this.ecoFriendly.set(this.data.ride.car?.fuel === 'electric');
  }

  getDriverAvatar(): string {
    return this.data.ride.driver.picture || '/images/avatars/default-user.jpg';
  }

  // Calculer les places disponibles
  get availableSeats(): number {
    const ride = this.data.ride;
    return ride.seats - (ride.participations?.length || 0);
  }


  hasOptions(): boolean {
    return !!this.data.ride.options && Object.values(this.data.ride.options).some(val => val);
  }

  // Méthode EXCLUSIVE pour les PARTICIPANTS
  getParticipantAvatar(participant: { user: { id: number } }): string {
    return `/images/avatars/${participant.user.id}.jpg` || '/images/avatars/default-user.jpg';
  }

  getFuelClass(fuelType: string): string {
    switch(fuelType) {
      case 'electric': return 'fuel-electric';
      case 'diesel': return 'fuel-diesel';
      default: return 'fuel-gasoline';
    }
  }

  handleImageError(event: Event, type: 'driver' | 'participant' = 'participant') {
    const img = event.target as HTMLImageElement;
    img.src = type === 'driver'
      ? '/images/avatars/default-driver.jpg'
      : '/images/avatars/default-participant.jpg';
    img.onerror = null;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
