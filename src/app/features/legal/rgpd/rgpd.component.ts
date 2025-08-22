import {Component, inject, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {RgpdService} from "../../../services/rgpd.service";
import {RgpdRequest} from "../../../core/models/others/rgpd-request";

@Component({
  selector: 'app-rgpd',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    MatLabel,
  ],
  templateUrl: './rgpd.component.html',
  styleUrl: './rgpd.component.css'
})
export class RgpdComponent {
  private formBuilder = inject(FormBuilder);
  private rgpdService = inject(RgpdService);

  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');
  errorMessage = signal('idle');

  rgpdForm = this.formBuilder.group({
    requestType: [[], Validators.required],
    email: ['', [Validators.required, Validators.email]],
    reason: ['']
  });

  async onSubmitRequest() {
    if (this.rgpdForm.invalid) {
      this.rgpdForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    try {
      const requestData: RgpdRequest = {
        requestType: this.rgpdForm.value.requestType!,
        email: this.rgpdForm.value.email!,
        reason: this.rgpdForm.value.reason || undefined,
      };

      await this.rgpdService.submitRgpdRequest(requestData);

      this.submitStatus.set('success');
      this.rgpdForm.reset();

    } catch (error) {
      this.submitStatus.set('error');
      this.errorMessage.set('Erreur lors de l\'envoi de votre demande. Réessayez plus tard.')
      console.error('Erreur RGPD:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
