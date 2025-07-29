import { Injectable } from '@angular/core';
import {GeocodingResult, GeocodingService} from "./geocoding.service";
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap} from "rxjs";
import {Util} from "leaflet";
import trim = Util.trim;

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private geocodingService: GeocodingService) { }
  /**
   * Crée un observable d'autocomplétion simplifié
   * @param input$ Flux de saisie utilisateur
   * @param maxResults Nombre max de résultats (par défaut 5)
   */
  createAutocompleteObserver(
    input$: Observable<string>,
    maxResults: number = 5
  ): Observable< { results: GeocodingResult[]; loading: boolean }> {
    return input$.pipe(
      debounceTime(300), // Attend 300ms après la dernière frappe
      distinctUntilChanged(),  // Ignore si la valeur n'a pas changé
      switchMap(query => {
        if (!query?.trim()) {
          // of crée un Observable qui emet immediatement une valeur
          return of({results: [], loading: false});
        }
        return this.geocodingService.geocode(query).pipe(
          map(results => ({
            results: results.slice(0, maxResults), //limite les resultats
            loading: false
          })),
          catchError(() => of({results: [], loading: false})),
          startWith({results: [], loading: true}) //etat de chargement initial
        );
      })
    );
  }
}
