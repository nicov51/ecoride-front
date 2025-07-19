import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {Car} from "../../../../../core/models/user/Car";
import {Router} from "@angular/router";
import {RidePublishService} from "../../data-access/ride-publish.service";
import {AuthService} from "../../../../../services/auth.service";
import {CarService} from "../../../../../services/car.service";

@Component({
  selector: 'app-step1-ride-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatButton,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    NgForOf,
    NgIf
  ],
  templateUrl: './step1-ride-info.component.html',
  styleUrl: './step1-ride-info.component.css'
})
export class Step1RideInfoComponent implements OnInit {

  rideForm!: FormGroup;
  cars: Car[] = [];
  private ridePublishService = inject(RidePublishService)
  private authService = inject(AuthService);
  private carService = inject(CarService);
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.rideForm = this.fb.group({
      departurePlace: ['', Validators.required],
      arrivalPlace: ['', Validators.required],
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      carId: [null, Validators.required],
    });
    // On récupère l'utilisateur connecté
    const user = this.authService.currentUserSignal();
    if (user?.id) {
      this.carService.getUserCars(user.id).subscribe({
        next: (cars) => this.cars = cars,
        error: (err) => console.error('Erreur récupération des voitures', err)
      });
    } else {
      console.warn("Aucun utilisateur connecté pour récupérer les voitures");
    }
  }
  onNextStep(): void {
    if (this.rideForm.valid){
      //on recupere la 1ere partie des datas
      this.ridePublishService.setRideData(this.rideForm.value);

      //pour aller a l'etape suivante
      this.router.navigate(['/publier/itineraire'])
    }
  }
}
