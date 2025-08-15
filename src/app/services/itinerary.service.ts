import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {ORSResponse} from "../core/models/ride/ors-reponse";

export interface ItineraryRequest {
  start: [number, number]; // [lon, lat]
  end: [number, number];   // [lon, lat]
}

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private readonly http = inject(HttpClient);
  /**
   * Appelle le backend pour récupérer un itinéraire
   * @param data Coordonnées de départ et arrivée
   * @returns GeoJSON avec les coordonnées du trajet
   */
  getItinerary(data: ItineraryRequest): Observable<ORSResponse> {
    return this.http.post<ORSResponse>(`${environment.apiUrl}/api/itinerary`, data).pipe(
      tap(response => console.log('Réponse brute reçue front:', response)),
    );
  }
}
