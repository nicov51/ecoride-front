import {Component, inject, Input} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, DecimalPipe, NgForOf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {Ride} from "../../../core/models/ride/ride";
import {AuthService} from "../../../services/auth.service";
import {FuelTypePipe} from "../../../pipes/fuel-type.pipe";
import {MatList, MatListItem} from "@angular/material/list";
import {Router, RouterLink} from "@angular/router";
import {getAvailableSeats} from "../../../shared/utils/ride.utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ParticipationService} from "../../../services/participation.service";
import {lastValueFrom} from "rxjs";

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
    MatIconButton,
    FuelTypePipe,
    MatList,
    MatListItem,
    DecimalPipe,
    RouterLink,
    MatProgressSpinner
  ],
  templateUrl: './ride-details.component.html',
  styleUrl: './ride-details.component.css'
})
export class RideDetailsComponent {
  isJoining: boolean = false;
  ride: Ride | null = null;
  authService = inject(AuthService);
  participationService = inject(ParticipationService);
  errorMessage: string | null = null;

  constructor(private router: Router) {
    // Récupère l'objet depuis l'état de navigation
    this.ride = this.router.getCurrentNavigation()?.extras.state?.['ride'];
  }

  get availableSeats(): number {
    return this.ride ? getAvailableSeats(this.ride) : 0;
  }


  async joinRide() {
    if (!this.authService.isLogged()) {
      this.errorMessage = 'Connectez-vous pour rejoindre un trajet';
      return;
    }
    if (!this.ride) {
      return;
    }
    this.isJoining = true;
    this.errorMessage = null;

    try {
      const participation = await lastValueFrom(
        this.participationService.joinRide(this.ride.id)
      );

      // Mise à jour SIMPLE (sans "optimiste" si ça t'embrouille)
      if (!this.ride.participations) {
        this.ride.participations = [];
      }

      this.ride.participations.push({
        id: participation.id,
        status: participation.status,
        // joinedAt est optionnel si interface Ride ne le demande pas
        user: {
          id: participation.user.id,
          name: participation.user.name
        }
      });

    } catch (error) {
      this.errorMessage = 'Erreur lors de la participation';
      console.error(error);
    } finally {
      this.isJoining = false;
    }
  }
}
