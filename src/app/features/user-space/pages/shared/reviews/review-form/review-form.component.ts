import {Component, EventEmitter, inject, Input, input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {TitleCasePipe} from "@angular/common";
import {ReviewToCreate} from "../../../../../../core/models/user/review-to-create";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatDivider,
    MatLabel,
    MatCardTitle,
    MatError,
    TitleCasePipe,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatRadioGroup,
    MatRadioButton,
    MatInput,
    MatCheckbox
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent {
  // Entrée : liste des trajets disponibles pour sélection
  @Input() rides: { id: number; departurePlace: string; arrivalPlace: string }[] = [];
  // Sortie : émet les données du formulaire quand soumis
  @Output() formSubmitted = new EventEmitter<ReviewToCreate>();
  // Sortie : émet un événement quand annulé
  @Output() formCancelled = new EventEmitter<void>();
  private fb = inject(FormBuilder);

  // Formulaire avec champs obligatoires
  reviewForm = this.fb.group({
    rideId: [null, Validators.required],
    rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: [''],       // Commentaire (optionnel sauf si signalement)
    isProblem: [false]   // Case à cocher pour signalement
  });

  constructor() {
    // Quand "isProblem" change, on ajuste les validateurs du commentaire
    this.reviewForm.get('isProblem')?.valueChanges.subscribe(isProblem => {
      const commentControl = this.reviewForm.get('comment');
      if (isProblem) {
        commentControl?.setValidators([Validators.required]); // Obligatoire si signalement
      } else {
        commentControl?.clearValidators(); // Optionnel sinon
      }
      commentControl?.updateValueAndValidity();
    });
  }

  // Soumet le formulaire si valide
  onSubmit(): void {
    if (this.reviewForm.invalid) {
      console.error('Formulaire invalide');
      return;
    }

    // Vérification explicite que rideId n'est pas null
    const formValue = this.reviewForm.value;
    if (formValue.rideId === null) {
      throw new Error('rideId ne peut pas être null');
    }

    // Cast explicite pour correspondre à ReviewToCreate
    this.formSubmitted.emit({
      rideId: formValue.rideId!,  // Le "!" dit à TypeScript qu'on a vérifié que ce n'est pas null
      rating: formValue.rating!,
      comment: formValue.comment!,
      isProblem: formValue.isProblem!
    });
  }

  // Annule le formulaire
  onCancel(): void {
    this.formCancelled.emit();
  }
}
