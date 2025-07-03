import { Component } from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatButton,
    MatLabel,
    MatInput,
    MatError,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor( private router: Router ){}

  errorMessage: string | null = null;

  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });


  onSubmit() {
    this.errorMessage = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email === 'test@example.com' && password === 'password') {
      //this.auth.login('FAKE_JWT_TOKEN');
      this.router.navigate(['/user']);
    } else {
      this.errorMessage = 'Email ou mot de passe incorrect';
    }
  }

  // on caste explicitement  avec as FormControl pour acceder a la proprieté touched
  get email(): FormControl<string> {
    return this.loginForm.get('email') as FormControl<string> ;
  }

  get password(): FormControl<string> {
    return this.loginForm.get('password') as FormControl<string> ;
  }
}

