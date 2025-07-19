import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

  constructor(private http: HttpClient) { }
  /**
   * Appelle le backend NestJS pour géocoder une adresse
   * @param query Adresse ou recherche
   * @returns Liste de résultats
   */
  //encodeUriComponent pour proteger les params des url
  geocode(query: string): Observable<GeocodingResult[]> {
    return this.http.get<GeocodingResult[]>(`${environment.apiUrl}/api/geocoding?q=${encodeURIComponent(query)}`);
  }
}
