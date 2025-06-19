import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

export interface Coordinate {
  lat: number;
  lon: number;
}

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
  properties: any;
}

export interface ORSResponse {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {}


   // Convertit une adresse en coordonnées GPS (via Nominatim)
  geocodeAddress(address: string): Observable<Coordinate[]> {
    const params = new HttpParams()
      .set('q', address)
      .set('format', 'json');

    return this.http.get<Coordinate[]>(
      `https://nominatim.openstreetmap.org/search`,
      { params }
    );
  }

  // Recupere un itineraire entre 2 points

  getItinerary(
    startCoords: [number, number],
    endCoords: [number, number]
  ) {

    const headers = new HttpHeaders({
      'Authorization': environment.apis.OPENROUTESERVICE_API_KEY,
      'Content-Type': 'application/json'
    });

    const body = {
      coordinates: [startCoords, endCoords],
      instructions: false,
    };


    return this.http.post<ORSResponse>(
      `https://api.openrouteservice.org/v2/directions/driving-car`,
      body,
      { headers }
    );
  }
}
