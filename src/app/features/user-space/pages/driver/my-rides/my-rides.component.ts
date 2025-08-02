import {Component, inject, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import { MatDialog } from '@angular/material/dialog';
import {Ride} from "../../../../../core/models/ride/ride";
import {RideService} from "../../../../../services/ride.service";
import {RideStatus} from "../../../../../core/models/ride/ride-status.enum";
import {Observable, of} from "rxjs";
import {AuthService} from "../../../../../services/auth.service";
import {RideDetailsComponent} from "../../../../carpool/ride-details/ride-details.component";

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
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './my-rides.component.html',
  styleUrl: './my-rides.component.css'
})
export class MyRidesComponent implements OnInit {
  protected readonly RideStatus = RideStatus;
  private dialog = inject(MatDialog);
  private rideService = inject(RideService);
  private authService = inject(AuthService);

  rides$: Observable<Ride[]> = of([]); // valeur par défaut

  ngOnInit(): void {
    const user = this.authService.currentUserSignal();
    if (!user) return;

    this.rides$ = this.rideService.getMyRides(user.id);
  }

  openDialog(ride: Ride): void {
    this.dialog.open(RideDetailsComponent, {
      data: { ride },
      width: '800px',
      maxHeight: '90vh'
    });
  }

  startRide(ride: Ride) {
    ride.status = RideStatus.IN_PROGRESS;
  }

  completeRide(ride: Ride) {
    ride.status = RideStatus.COMPLETED;
  }

  cancelRide(ride: Ride) {
    ride.status = RideStatus.CANCELLED;
  }
}
