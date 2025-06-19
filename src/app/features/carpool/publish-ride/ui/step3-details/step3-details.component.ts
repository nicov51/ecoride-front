import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {RidePublishService} from "../../data-access/ride-publish.service";

@Component({
  selector: 'app-step3-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSelect,
    MatCheckbox,
    MatOption,
    MatInput,
    MatButton,
    NgIf
  ],
  templateUrl: './step3-details.component.html',
  styleUrl: './step3-details.component.css'
})
export class Step3DetailsComponent {

  RidePublishService = inject(RidePublishService)
  form: FormGroup;

  constructor(private fb: FormBuilder) {

const ride = this.RidePublishService.getRideData();

    this.form = this.fb.group({
      price: [ride.price || '', [Validators.required, Validators.min(0)]],
      seats: [ride.seats || '', [Validators.required, Validators.min(1)]],
      petsAllowed: [ride.options?.petsAllowed || false],
      luggageAllowed: [ride.options?.luggageAllowed || false],
      airConditioning: [ride.options?.airConditioning || false],

      // Préférences par défaut (à modifier selon la source réelle)
      chat: [ride.preferences?.chat || 'yes'],
      smoking: [ride.preferences?.smoking || 'no'],
      music: [ride.preferences?.music || 'yes'],
      pets: [ride.preferences?.pets || 'no'],
      other: [ride.preferences?.other || ''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const values = this.form.value;

      this.RidePublishService.setRideData({
        ...this.RidePublishService.getRideData(),

        price: values.price,
        seats: values.seats,

        options: {
          petsAllowed: values.petsAllowed,
          luggageAllowed: values.luggageAllowed,
          airConditioning: values.airConditioning,
        },

        preferences: {
          chat: values.chat,
          smoking: values.smoking,
          music: values.music,
          pets: values.pets,
          other: values.other,
        },

        // L'itinéraire peut déjà être enregistré à l’étape précédente
        // Si pas encore présent, tu peux le mettre à jour ici plus tard
        // route: [[lat1, lng1], [lat2, lng2], ...]
      });

      console.log('🟢 Données finales prêtes à être envoyées :', this.RidePublishService.getRideData());
    } else {
      this.form.markAllAsTouched();
    }
  }

}
