import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {CTAComponent} from "../../CTA-button/CTA.component";


@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatIconButton,
    MatIcon,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatButton,
    MatLabel,
    CTAComponent
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      from: [''],
      to: [''],
      date: ['']
    });
  }

  swapLocations(): void {
    const from = this.form.get("from")?.value;
    const to = this.form.get("to")?.value;
    this.form.patchValue({from: to, to: from});
  }

  //Todo: validators et gestion des erreurs

  onSubmit(): void {
    if (this.form.valid) {
      console.log('recherche lancée avec :', this.form.value);
    }
  } ;
}
