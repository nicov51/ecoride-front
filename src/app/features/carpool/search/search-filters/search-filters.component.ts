import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatRadioGroup,
    MatRadioButton,
    MatCheckbox
  ],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css'
})
export class SearchFiltersComponent {
  @Input({ required: true }) formGroup!: FormGroup;

  sortOptions = [
    { value: 'earliest', label: 'Départ le plus tôt' },
    { value: 'lowestPrice', label: 'Prix le plus bas' },
    { value: 'closestStart', label: 'Départ le plus proche' }
  ];

  timeRanges = [
    { value: 'all', label: 'Toute la journée' },
    { value: 'morning', label: 'Matin (6h-12h)' },
    { value: 'afternoon', label: 'Après-midi (12h-18h)' },
    { value: 'evening', label: 'Soirée (après 18h)' }
  ];
}
