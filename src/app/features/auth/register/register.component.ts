import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../../../services/auth.service";
import {RegisterUserDto} from "../../../core/models/user/register-user.dto";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    RouterLink,
    NgIf,
    MatError,
    MatLabel,
    MatFormField,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatInput,
    MatIcon
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Référence à l'input fichier caché
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    firstName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    birthDate: ['', Validators.required],
    pseudo: ['', Validators.required],
    picture: [null as string | null]
  })

  selectedFile: File | null = null;
  errorMessage: string | null = null;
  isLoading = false;

//Todo gerer l'upload d'image
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Pour l'instant on stocke juste le nom du fichier
      this.registerForm.patchValue({
        picture: this.selectedFile.name
      });
    }
  }

  triggerFileInput() {
    this.fileUpload.nativeElement.click();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formValue = this.registerForm.value;
    const userData: RegisterUserDto = {
      name: formValue.name!,
      firstName: formValue.firstName!,
      email: formValue.email!,
      password: formValue.password!,
      phone: formValue.phone!,
      address: formValue.address!,
      birthDate: new Date(formValue.birthDate!).toISOString().split('T')[0],
      pseudo: formValue.pseudo!,
      picture: formValue.picture || null,
      isVerified: false
    };

    this.authService.register(userData).subscribe({
      next: (res) => {
        console.log('User created:', res);
        this.router.navigate(['/user']); // redirection après inscription
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = 'Erreur lors de l’inscription. Veuillez réessayer.';
      },
    });

  }
}
