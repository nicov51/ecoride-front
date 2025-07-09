import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CarToCreate} from "../../../../../core/models/user/CarToCreate";

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    MatLabel,
  ],
  templateUrl: './car-form.component.html',
  styleUrl: './cars.component.css'
})
export class CarFormComponent {
  // car-form emet un event vers cars.component
  @Output() formSubmitted = new EventEmitter<CarToCreate>();
  carForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.carForm = this.formBuilder.group({
      model: ['', Validators.required],
      color: ['', Validators.required],
      fuel: ['', Validators.required],
      firstRegistration: ['', Validators.required],
      registration: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.carForm.invalid) return;

    const formValue = this.carForm.value;

    const carToCreate: CarToCreate = {
      model: formValue.model,
      color: formValue.color,
      fuel: formValue.fuel,
      firstRegistration: new Date(formValue.firstRegistration),
      registration: formValue.registration,
    };

    this.formSubmitted.emit(carToCreate);
    this.carForm.reset();
  }
}
