import { Component } from '@angular/core';
import {SearchFormComponent} from "../../../shared/form/search-form/search-form.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import { JsonPipe, NgIf} from "@angular/common";
import {SearchParams} from "../../../core/models/ride/SearchParams";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchFiltersComponent} from "./search-filters/search-filters.component";




@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SearchFormComponent,
    SearchResultsComponent,
    JsonPipe,
    NgIf,
    SearchFiltersComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  // Reactive form des filtres (sidebar)
  filterForm: FormGroup;

// Données du formulaire de recherche (ville, date, etc)
  searchParams: SearchParams | null = null;

  constructor(private fb: FormBuilder) {
    // Création du form des filtres
    this.filterForm = this.fb.group({
      sortBy: ['price'], // 'price' | 'earliest' | 'closest'
      timeRange: ['all'], // 'morning' | 'afternoon' | 'evening' | 'all'
      electricOnly: [false],
      superDriver: [false],
      verifiedProfile: [false],
    });
  }

  // Callback appelé à la soumission du formulaire de recherche
  handleSearchSubmit(params: SearchParams): void {
    this.searchParams = params;
  }
}
