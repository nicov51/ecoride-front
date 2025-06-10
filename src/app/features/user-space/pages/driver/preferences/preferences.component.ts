import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    MatChip,
    MatChipListbox,
    MatFormField,
    MatInput,
    FormsModule,
    MatIcon
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {
  preferences: {
    chat: string;
    smoking: string;
    music: string;
    pets: string;
    other: string;
    [key: string]: string;
  } = {
    chat: 'yes',
    smoking: 'no',
    music: 'yes',
    pets: 'no',
    other: ''
  };

  // À ajouter si besoin
  additionalPreferences = [
    { icon: 'air', label: 'Climatisation', key: 'ac' },
    { icon: 'luggage', label: 'Bagages volumineux', key: 'luggage' },
    { icon: 'child_friendly', label: 'Enfants acceptés', key: 'children' }
  ];

  updatePreference(field: string, value: string) {
    this.preferences[field] = value;
    console.log('Préférence mise à jour :', field, value);
    // À connecter au backend plus tard
  }
}
