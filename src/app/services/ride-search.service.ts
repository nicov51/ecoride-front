import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchParams} from "../core/models/ride/SearchParams";
import {map, Observable} from "rxjs";
import {Ride} from "../core/models/ride/ride";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RideSearchService {
  private readonly http = inject(HttpClient);

  search(params: SearchParams): Observable<{ exactMatches: Ride[], suggestions: Ride[] }> {
    return this.http.get<Ride[]>(`${environment.apiUrl}/api/rides/search`, {
      params: this.createBackendParams(params),
    }).pipe(
      map(rides => {
        const exactMatches = this.applyExactFilters(rides, params);
        const suggestions = exactMatches.length === 0
          ? this.getDateSuggestions(rides, params.date)
          : [];

        return { exactMatches, suggestions };
      })
    );
  }

  private applyExactFilters(rides: Ride[], params: SearchParams): Ride[] {
    // Filtres stricts (date exacte, etc.)
    let filtered = [...rides];

    if (params.date) {
      const requestedDate = new Date(params.date).toDateString();
      filtered = filtered.filter(ride =>
        new Date(ride.departureDateTime).toDateString() === requestedDate
      );
    }

    // ... autres filtres frontaux
    return filtered;
  }

  private getDateSuggestions(rides: Ride[], date?: Date): Ride[] {
    if (!date) return [];

    return [...rides]
      .sort((a, b) => {
        const diffA = Math.abs(new Date(a.departureDateTime).getTime() - date.getTime());
        const diffB = Math.abs(new Date(b.departureDateTime).getTime() - date.getTime());
        return diffA - diffB;
      })
      .slice(0, 5); // 5 suggestions max
  }



  private createBackendParams(params: SearchParams): HttpParams {
    let httpParams = new HttpParams();

    // Paramètres envoyés au backend
    if (params.from) httpParams = httpParams.set('from', params.from);
    if (params.to) httpParams = httpParams.set('to', params.to);
    // Correction pour la date suggerée par l'IA a reprendre!
    if (params.date) {
      // Utilise la date locale sans conversion de timezone
      const dateStr = `${params.date.getFullYear()}-${(params.date.getMonth()+1).toString().padStart(2, '0')}-${params.date.getDate().toString().padStart(2, '0')}`;
      httpParams = httpParams.set('date', dateStr);
    }
    if (params.minPrice) httpParams = httpParams.set('minPrice', params.minPrice.toString());
    if (params.seats) httpParams = httpParams.set('seats', params.seats.toString());
    if (params.electricOnly) httpParams = httpParams.set('electricOnly', 'true');
    if (params.departureZoneId) httpParams = httpParams.set('departureZoneId', params.departureZoneId.toString());
    if (params.arrivalZoneId) httpParams = httpParams.set('arrivalZoneId', params.arrivalZoneId.toString());

    return httpParams;
  }

  private applyFrontendFilters(rides: Ride[], params: SearchParams): Ride[] {
    if (!params.frontFilters) return rides;

    return rides.filter(ride => {
      const filters = params.frontFilters;

      // Filtre Super Driver
      if (filters?.superDriver && !this.isSuperDriver(ride.driver)) {
        return false;
      }

      // Filtre profil vérifié
      if (filters?.verifiedProfile && !ride.driver.picture) {
        return false;
      }

      // Filtre plage horaire
      if (filters?.timeRange) {
        const hour = ride.departureDateTime.getHours();
        switch(filters.timeRange) {
          case 'morning': if (hour < 6 || hour >= 12) return false; break;
          case 'afternoon': if (hour < 12 || hour >= 18) return false; break;
          case 'evening': if (hour < 18) return false; break;
        }
      }

      return true;
    });
  }


  // Todo Implémentez logique pour identifier un Super Driver
  isSuperDriver(driver: { id: number }): boolean {
    return true;
  }


  private sortRides(rides: Ride[], sortBy?: string): Ride[] {
    if (!sortBy || sortBy === 'earliest') {
      return [...rides].sort((a, b) => a.departureDateTime.getTime() - b.departureDateTime.getTime());
    }

    if (sortBy === 'lowestPrice') {
      return [...rides].sort((a, b) => a.price - b.price);
    }

    if (sortBy === 'closestStart') {
      const now = new Date();
      return [...rides].sort((a, b) => {
        const diffA = Math.abs(a.departureDateTime.getTime() - now.getTime());
        const diffB = Math.abs(b.departureDateTime.getTime() - now.getTime());
        return diffA - diffB;
      });
    }

    return rides;
  }
}
