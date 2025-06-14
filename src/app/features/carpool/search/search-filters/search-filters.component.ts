import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css'
})
export class SearchFiltersComponent {
  @Input() filterForm!: FormGroup;
}
