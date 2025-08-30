import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ModerateReviewDto, ProblemRideResponse} from "../core/models/employee.interface";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProblemRides(): Observable<ProblemRideResponse[]> {
    return this.http.get<ProblemRideResponse[]>(`${this.apiUrl}/api/problem-rides`);
  }

  moderateReview(reviewId: number, dto: ModerateReviewDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/reviews/${reviewId}/moderate`, dto);
  }

  deleteRide(rideId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/rides/${rideId}`);
  }
}
