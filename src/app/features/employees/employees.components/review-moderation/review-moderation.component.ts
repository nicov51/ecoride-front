import {Component, computed, inject, signal} from '@angular/core';
import {ReviewService} from "../../../../services/review.service";
import {Review} from "../../../../core/models/user/review";

@Component({
  selector: 'app-review-moderation',
  standalone: true,
  imports: [],
  templateUrl: './review-moderation.component.html',
  styleUrl: './review-moderation.component.css'
})
export class ReviewModerationComponent {
  private reviewService = inject(ReviewService);
  reviews = signal<Review[]>([])
  // filter = signal<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING')
  //
  // filteredReviews = computed(() => {
  //   return this.reviews().filter(r => r.status === this.filter());
  // })
}
