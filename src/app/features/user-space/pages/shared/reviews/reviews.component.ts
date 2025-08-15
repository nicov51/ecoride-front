import {Component, inject, OnInit, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {ReviewFormComponent} from "./review-form/review-form.component";
import {ReviewToCreate} from "../../../../../core/models/user/review-to-create";
import {ReviewService} from "../../../../../services/review.service";
import {AuthService} from "../../../../../services/auth.service";
import {Review} from "../../../../../core/models/user/review";
import {RideService} from "../../../../../services/ride.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    MatCardContent,
    NgForOf,
    MatButton,
    MatDivider,
    ReviewFormComponent,
    TitleCasePipe,
    MatProgressSpinner
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  // ----- SERVICES -----
  private reviewService = inject(ReviewService);
  private authService = inject(AuthService);
  private rideService = inject(RideService);

  // ----- ÉTAT -----
  reviews = signal<Review[]>([]);
  showForm = signal(false);
  eligibleRides = signal<{id: number; departurePlace: string; arrivalPlace: string}[]>([]);
  isLoading = signal(false);

  ngOnInit(): void {
    this.loadReviews();
  }
  private loadReviews(): void {
    this.isLoading.set(true);
    const user = this.authService.currentUserSignal();

    if (!user) {
      this.isLoading.set(false);
      return;
    }

    this.reviewService.getUserReviews(user.id).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur chargement avis', err);
        this.isLoading.set(false);
      }
    });
  }
  private loadEligibleRides(): void {
    const user = this.authService.currentUserSignal();
    if (!user) return;

    this.rideService.getMyRides(user.id).subscribe({
      next: (rides) => {
        this.eligibleRides.set(rides);
      },
      error: (err) => {
        console.error('Erreur chargement trajets éligibles', err);
      }
    });
  }
  addReview(): void {
    // Charge les trajets éligibles si pas déjà fait
    if (this.eligibleRides().length === 0) {
      this.loadEligibleRides();
    }
    this.showForm.set(true);
  }
  onFormSubmitted(reviewData: ReviewToCreate): void {
    const user = this.authService.currentUserSignal();
    if (!user) return;

    this.isLoading.set(true);
    this.reviewService.createReview(reviewData, user.id).subscribe({
      next: (newReview) => {
        // Ajoute le nouvel avis en tête de liste
        this.reviews.update(reviews => [newReview, ...reviews]);
        this.showForm.set(false);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur création avis', err);
        this.isLoading.set(false);
      }
    });
  }
  onFormCancelled(): void {
    this.showForm.set(false);
  }
}
