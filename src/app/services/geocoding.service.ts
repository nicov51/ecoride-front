import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}
@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly http = inject(HttpClient);
  /**
   * Appelle le backend NestJS pour géocoder une adresse
   * @param query Adresse ou recherche
   * @returns Liste de résultats
   */

  geocode(query: string): Observable<GeocodingResult[]> {
    //encodeUriComponent pour proteger les params des url
    return this.http.get<GeocodingResult[]>(`${environment.apiUrl}/api/geocoding?q=${encodeURIComponent(query)}`)
      .pipe(
        catchError(err => {
          console.error('Erreur de géocodage', err);
          return of([]);
        })
      );
  }
}
