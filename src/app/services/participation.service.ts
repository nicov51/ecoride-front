import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ParticipationResponseDto} from "../core/models/ride/participation-response.dto";

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  joinRide(rideId: number): Observable<ParticipationResponseDto> {
    return this.http.post<ParticipationResponseDto>(`${this.apiUrl}/api/participations`, { rideId })
  }

  cancelParticipation(participationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/participations/${participationId}`);
  }
}
