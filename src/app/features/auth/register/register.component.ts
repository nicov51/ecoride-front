import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../../core/models/user/User";
import {UserService} from "../../../services/user.service";
import {Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";

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
    MatInput
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
registerForm: FormGroup;
selectedPicture: string | null = null;
errorMessage: string | null = null;

constructor(
  private formBuilder: FormBuilder,
  private userService: UserService,
  private router: Router,
  ) {
  this.registerForm = formBuilder.group({
    name: ['', Validators.required],
    firstName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    birthDate: ['', Validators.required],
    pseudo: ['', Validators.required],
    picture: [null]
  })
}

  get name() { return this.registerForm.get('name'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get phone() { return this.registerForm.get('phone'); }
  get address() { return this.registerForm.get('address'); }
  get birthDate() { return this.registerForm.get('birthDate'); }
  get pseudo() { return this.registerForm.get('pseudo'); }

//Todo gerer l'upload d'image
onFileChange($event: Event) {
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formValue = this.registerForm.value;

    const user: Partial<User> = {
      ...formValue,
      picture: this.selectedPicture ?? null,
      birthDate: new Date(formValue.birthDate).toISOString().split('T')[0],
      isVerified: false,
    }

    this.userService.createUser(user).subscribe({
      next: (res) => {
        console.log('User created:', res);
        this.router.navigate(['/user']); // ✅ redirection après inscription
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = 'Erreur lors de l’inscription. Veuillez réessayer.';
      },
    });

  }
}
