import {Component, inject} from '@angular/core';
import {SearchFormComponent} from "../../../shared/form/search-form/search-form.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {SearchFiltersComponent} from "./search-filters/search-filters.component";
import {RideSearchService} from "../../../services/ride-search.service";
import {NonNullableFormBuilder} from "@angular/forms";
import {Ride} from "../../../core/models/ride/ride";
import {SearchParams} from "../../../core/models/ride/SearchParams";
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SearchFiltersComponent,
    SearchFormComponent,
    SearchResultsComponent,
    AsyncPipe,
    MatProgressSpinner
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private rideSearchService = inject(RideSearchService);
  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);
  suggestedRides: Ride[] = [];

  loading = false;
  rides: Ride[] = []

  filterForm = this.fb.group({
    sortBy: this.fb.control<'earliest' | 'lowestPrice' | 'closestStart'>('earliest'),
    timeRange: this.fb.control<'all' | 'morning' | 'afternoon' | 'evening'>('all'),
    electricOnly: this.fb.control(false),
    superDriver: this.fb.control(false),
    verifiedProfile: this.fb.control(false)
  });

  handleSearch(params: Omit<SearchParams, 'frontFilters' | 'sortBy'>) {
    this.loading = true;
    this.rides = [];
    this.suggestedRides = [];

    const searchParams: SearchParams = {
      ...params,
      electricOnly: this.filterForm.value.electricOnly ?? undefined,
      frontFilters: {
        superDriver: this.filterForm.value.superDriver ?? false,
        verifiedProfile: this.filterForm.value.verifiedProfile ?? false,
        // creer une fonction de transformation?
        timeRange: (this.filterForm.value.timeRange !== 'all'
          ? this.filterForm.value.timeRange
          : undefined) as 'morning' | 'afternoon' | 'evening' | undefined
      },
      sortBy: this.filterForm.value.sortBy ?? 'earliest'
    };

    this.rideSearchService.search(searchParams).subscribe({
      next: ({ exactMatches, suggestions }) => {
        // Filtrer les Super Drivers si besoin
        if (searchParams.frontFilters?.superDriver) {
          exactMatches = exactMatches.filter(ride => this.rideSearchService.isSuperDriver(ride.driver));
          suggestions = suggestions.filter(ride => this.rideSearchService.isSuperDriver(ride.driver));
        }
        this.rides = exactMatches;
        this.suggestedRides = suggestions;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
// Todo: creer la logique de participation
  handleJoin(rideId: number) {
    console.log('Joindre le trajet', rideId)
  }

  onViewDetails(ride: Ride) {
    // Navigation vers la page de détails avec l'objet complet
    this.router.navigate(['/rides', ride.id], {
      state: { ride: JSON.parse(JSON.stringify(ride))
      } // Stocke l'objet dans l'état de navigation
    });
    console.log('Afficher les détails du trajet', ride.id);
  }
}
