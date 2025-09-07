import {Component, inject, OnInit, signal} from '@angular/core';
import {DatePipe} from "@angular/common";
import {EmployeesService} from "../../../../services/employees.service";
import {ProblemRideResponse} from "../../../../core/models/employee.interface";

@Component({
  selector: 'app-problem-rides',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './problem-rides.component.html',
  styleUrl: './problem-rides.component.css'
})
export class ProblemRidesComponent implements OnInit {
  private employeesService = inject(EmployeesService);

  problemRides = signal<ProblemRideResponse[]>([]);
  loading = signal(false);
  error = signal('');

  ngOnInit() {
    this.loadProblemRides();
  }

  loadProblemRides() {
    this.loading.set(true);
    this.error.set('');

    this.employeesService.getProblemRides().subscribe({
      next: (rides) => {
        this.problemRides.set(rides);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Erreur lors du chargement des trajets');
        this.loading.set(false);
        console.error(error);
      }
    });
  }

  getRatingStars(rating: number): string {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  approveReview(reviewId: number, rideId: number) {
    this.employeesService.moderateReview(reviewId, { decision: 'approved'}).subscribe({
      next: () => {
        this.removeRideFromList(rideId);
      },
      error: (error) => console.error('Erreur suppression:', error)
    });
  }

  private removeRideFromList(rideId: number) {
    this.problemRides.update(rides => rides.filter(ride => ride.id !== rideId));
  }

  rejectReview(reviewId: number, rideId: number, reason: string) {
    this.employeesService.moderateReview(reviewId, {
      decision: 'rejected',
      reason
    }).subscribe({
       next: () => {
         this.removeRideFromList(rideId);
       },
      error: (error) => console.error('Erreur suppression:', error)
    });
  }

  deleteRide(rideId: number) {
    if (confirm('Etes vous sur de vouloir supprimer ce trajet?')) {
      this.employeesService.deleteRide(rideId).subscribe({
        next: () => {
          this.removeRideFromList(rideId);
        },
        error: (error) => console.error('Erreur suppression:', error)
      });
    }
  }
}
