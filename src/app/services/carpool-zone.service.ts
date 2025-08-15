import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarpoolZone} from "../core/models/ride/carpool-zone.model";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {Coordinates, filterZonesByProximity} from "../shared/utils/geo.utils";

@Injectable({
  providedIn: 'root'
})
export class CarpoolZoneService {
  // Zones par défaut pour le développement
  private defaultZones: CarpoolZone[] = [
    { id: 1, label: 'Centre-ville Reims', lat: 49.2583, lng: 4.0317 },
    { id: 2, label: 'Gare Reims', lat: 49.2535, lng: 4.0261 },
    { id: 3, label: 'Université Reims', lat: 49.2411, lng: 4.0203 },
    { id: 4, label: 'Centre-ville Strasbourg', lat: 48.5831, lng: 7.7479 },
    { id: 5, label: 'Gare Strasbourg', lat: 48.5855, lng: 7.7357 },
    { id: 6, label: 'Université Strasbourg', lat: 48.5794, lng: 7.7682 }
  ];
  private readonly http = inject(HttpClient);

  getAllZones(): Observable<CarpoolZone[]> {
    return this.http.get<CarpoolZone[]>(`${environment.apiUrl}/api/carpool-zones`);
  }

  /**
   * Récupère les zones proches d'un point
   */
  getNearbyZones(center: Coordinates, radiusKm = 5): Observable<CarpoolZone[]> {
    if (!environment.production) {
      // Mode développement : utilise les zones en dur
      const zones = filterZonesByProximity(
        this.defaultZones,
        center,
        radiusKm
      );
      return of(zones);
    }

    // Mode production : appelle l'API
    return this.http.get<CarpoolZone[]>(
      `${environment.apiUrl}/api/carpool-zones/nearby`,
      { params: { lat: center.lat.toString(), lng: center.lng.toString(), radius: radiusKm.toString() } }
    );
  }
}
