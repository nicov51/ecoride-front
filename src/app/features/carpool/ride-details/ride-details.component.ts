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
import {lastValueFrom, take} from "rxjs";
import {WalletService} from "../../../services/wallet.service";
import {HttpErrorResponse} from "@angular/common/http";

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
  walletService = inject(WalletService);
  errorMessage: string | null = null;
  showConfirmation = false;

  successMessage: string | null = null;
  currentBalance: number = 0;

  constructor(private router: Router) {
    // Récupère l'objet depuis l'état de navigation
    this.ride = this.router.getCurrentNavigation()?.extras.state?.['ride'];
  }

  get availableSeats(): number {
    return this.ride ? getAvailableSeats(this.ride) : 0;
  }


  async joinRide(): Promise<void> {
    if (!this.authService.isLogged()) {
      this.errorMessage = 'Veuillez vous connecter pour participer';
      this.router.navigate(['/login']);
      return;
    }

    if (!this.ride || this.availableSeats <= 0) return;

    this.isJoining = true;
    this.errorMessage = null;

    try {
      // Vérification du solde
      const wallet = await lastValueFrom(this.walletService.fetchWallet().pipe(take(1)));
      this.currentBalance = wallet.balance;

      if (wallet.balance < this.ride.price) {
        this.errorMessage = `Solde insuffisant (${wallet.balance} crédits). Il vous faut ${this.ride.price} crédits.`;
        return;
      }

      this.showConfirmation = true;
    } catch (error) {
      this.errorMessage = 'Erreur lors de la vérification du solde';
      console.error(error);
    } finally {
      this.isJoining = false;
    }
  }

  async confirmParticipation(): Promise<void> {
    if (!this.ride) return;

    this.isJoining = true;
    this.showConfirmation = false;
    this.errorMessage = null;


    try {
      const participation = await lastValueFrom(
        this.participationService.joinRide(this.ride.id)
      );

      // Mise à jour locale
      this.ride.participations = [
        ...(this.ride.participations || []),
        {
          id: participation.id,
          status: participation.status,
          user: {
            id: participation.user.id,
            name: participation.user.name
          }
        }
      ];

      this.successMessage = `Participation confirmée! ${this.ride.price} crédits ont été débités.`;
      setTimeout(() => this.successMessage = null, 5000);

      console.log('Participation confirmée ! ${this.ride.price} crédits débités.');

      this.walletService.fetchWallet(); // Rafraîchit le solde
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Erreur lors de la participation';
      }
    } finally {
      this.isJoining = false;
    }
  }
}
