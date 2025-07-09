import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../../../services/auth.service";
import {CarFormComponent} from "./car-form.component";
import {CarService} from "../../../../../services/car.service";
import {Car} from "../../../../../core/models/user/Car";
import {CarToCreate} from "../../../../../core/models/user/CarToCreate";

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatIconButton,
    MatButton,
    NgForOf,
    DatePipe,
    CarFormComponent,
    NgIf
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  carService = inject(CarService);
  authService = inject(AuthService);
  showForm = false;

  ngOnInit() {
    const user = this.authService.currentUserSignal();
    if (!user) return;

    this.carService.getUserCars(user.id).subscribe({
      next: cars => this.cars = cars,
      error: err => console.error('Erreur chargement des véhicules', err)
    });
  }


  addCar() {
    this.showForm = true;
  }

  // removeCar(carId: number) {
  //   this.cars = this.cars.filter(car => car.id !== carId);
  // }

  removeCar(carId: number) {
    const currentUser = this.authService.currentUserSignal();
    if (!currentUser) return;

    this.carService.deleteCar(carId, currentUser.id).subscribe({
      next: () => {
        this.cars = this.cars.filter(car => car.id !== carId);
      },
      error: (err: unknown) => {
        console.error('Erreur suppression voiture', err);
      }
    });
  }

  addCarToList(carData: CarToCreate) {
    const currentUser = this.authService.currentUserSignal();
    if(!currentUser) return;

    this.carService.createCar(carData, currentUser.id).subscribe({
      next: (savedCar: Car) => {
        this.cars.push(savedCar);
        this.showForm = false;
      },
      error: (err: unknown) => {
        console.error('Erreur lors de la creation du vehicule', err);
      }
    })
  }
}
