import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {Car} from "../../../../../core/models/user/Car";
import {Router} from "@angular/router";
import {RidePublishService} from "../../data-access/ride-publish.service";

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
    NgForOf
  ],
  templateUrl: './step1-ride-info.component.html',
  styleUrl: './step1-ride-info.component.css'
})
export class Step1RideInfoComponent implements OnInit {

  rideForm!: FormGroup;
  cars: Car[] = [];
  private ridePublishService = inject(RidePublishService)



  constructor(
    private fb: FormBuilder,
    private router: Router,
    // creer 1 carService pour recup les cars
    ) {
  }

  ngOnInit(): void {
    this.rideForm = this.fb.group({
      departurePlace: ['', Validators.required],
      arrivalPlace: ['', Validators.required],
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      carId: [null],
    });

    // this.carService.getUserCars().subscribe(cars => {
    //   this.cars = cars;
    // });


  }


onNextStep(): void {
    if (this.rideForm.valid){
      //on recupere la 1ere partie des datas
      this.ridePublishService.setRideData(this.rideForm.value);

      //appeler la methode router.navigate pour aller a l'etape suivante
      this.router.navigate(['/publier/itineraire'])
    };


}
}
