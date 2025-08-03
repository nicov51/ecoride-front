import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {PreferenceValue, RidePreferences} from "../../../../../core/models/ride/ride-preferences";

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
  @Input() preferences: RidePreferences = {
    chat: 'neutral',
    smoking: 'no',
    music: 'yes',
    pets: 'no',
    other: ''
  };

  @Output() preferencesChange = new EventEmitter<RidePreferences>();

  updatePreference(key: keyof RidePreferences, value: PreferenceValue): void {
    this.preferences = {
      ...this.preferences,
      [key]: value
    };
    this.preferencesChange.emit(this.preferences);
  }
}

