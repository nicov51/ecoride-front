import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {RidePublishService} from "../../data-access/ride-publish.service";
import {RideService} from "../../../../../services/ride.service";
import {CreateRideDto} from "../../../../../core/models/ride/create-ride.dto";
import {Router} from "@angular/router";

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

  ridePublishService = inject(RidePublishService)
  private rideService = inject(RideService);
  private router = inject(Router);
  form: FormGroup;

  constructor(private fb: FormBuilder) {

const ride = this.ridePublishService.getRideData();

    this.form = this.fb.group({
      price: [ride.price || '', [Validators.required, Validators.min(1)]],
      seats: [ride.seats || '', [Validators.required, Validators.min(1)]],
      petsAllowed: [ride.options?.petsAllowed || false],
      luggageAllowed: [ride.options?.luggageAllowed || false],
      airConditioning: [ride.options?.airConditioning || false],
      chat: [ride.preferences?.chat || 'yes'],
      smoking: [ride.preferences?.smoking || 'no'],
      music: [ride.preferences?.music || 'yes'],
      pets: [ride.preferences?.pets || 'no'],
      other: [ride.preferences?.other || '']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const values = this.form.value;

      this.ridePublishService.setRideData({
        ...this.ridePublishService.getRideData(),
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

      });
      const finalRide = this.ridePublishService.getRideData() as CreateRideDto;
      console.log('Données finales prêtes à être envoyées :', finalRide);

      this.rideService.createRide(finalRide).subscribe({
        next: res => {
          console.log('Trajet sauvegardé :', res);
          // Par exemple, rediriger vers une page de confirmation
          this.router.navigate(['/user/app-my-rides', res]);
        },
        error: err => console.error('Erreur de sauvegarde', err)
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
