import { Component } from '@angular/core';
import {SearchFormComponent} from "../../../shared/form/search-form/search-form.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {CommonModule, JsonPipe} from "@angular/common";
import {SearchParams} from "../../../core/models/ride/SearchParams";




@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    SearchFormComponent,
    SearchResultsComponent,
    JsonPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchParams: SearchParams | null = null;

  handleSubmit(formValue: SearchParams) {
    console.log("Form submitted", formValue);
    this.searchParams = formValue;
  }
}
