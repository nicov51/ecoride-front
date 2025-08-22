import {Component, inject, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private formBuilder = inject(FormBuilder);
  private contactService = inject(ContactService);
  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle'); //inactif par defaut
  errorMessage = signal('');

  contactForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    try {
      const formValue = this.contactForm.value;
      await this.contactService.sendContactMessage(formValue);

      this.submitStatus.set('success');
      this.contactForm.reset();


    } catch (error: unknown) {
      this.submitStatus.set('error');
      this.errorMessage.set(
        'Une erreur est survenue. Réessayez plus tard.'
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }

  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);
    if (control?.hasError('required')) return 'Ce champ est requis';
    if (control?.hasError('email')) return 'Email invalide';
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} caractères`;
    }
    return '';
  }
}
