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
    RouterLink
  ],
  templateUrl: './ride-details.component.html',
  styleUrl: './ride-details.component.css'
})
export class RideDetailsComponent {
  ride: Ride | null = null;
  authService = inject(AuthService);

  constructor(private router: Router) {
    // Récupère l'objet depuis l'état de navigation
    this.ride = this.router.getCurrentNavigation()?.extras.state?.['ride'];

    if (!this.ride) {
      // Fallback si accès direct
      this.router.navigate(['/search']);
    }
  }

  get availableSeats(): number {
    return this.ride ? getAvailableSeats(this.ride) : 0;
  }


  joinRide() {
    if (this.ride) {
      console.log('Rejoindre le trajet', this.ride.id);
    }
  }
}
