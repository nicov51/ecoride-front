import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Review} from "../core/models/user/review";
import {ReviewToCreate} from "../core/models/user/review-to-create";
import {Car} from "../core/models/user/Car";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getUserReviews(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/api/reviews?userId=${userId}`);
  }

  createReview(reviewData: ReviewToCreate, userId: number): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/api/reviews`, {
      ...reviewData,
      ownerId: userId
    });
  }
  // pour plus tard
  updateReviewStatus(reviewId: number, status: string, reason?: string): Observable<Review> {
    return this.http.patch<Review>(`${this.apiUrl}/api/reviews/${reviewId}/status`, { status, reason });
  }
}
