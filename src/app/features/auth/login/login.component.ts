import {Component, inject} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {LoginCredentials} from "../../../core/models/user/Login-credentials";

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
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage: string | null = null;
  isLoading: boolean = false;

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.loginForm.value as LoginCredentials).subscribe({
      next: () => {
        // Le token est déjà stocké via le tap() dans le service
        this.router.navigate(['/user']);
      },
      error: err => {
        this.errorMessage = this.getErrorMessage(err.status);
        this.isLoading = false;
      }
    });
  }
  private getErrorMessage(status: number): string {
    switch(status) {
      case 401: return 'Email ou mot de passe incorrect';
      case 500: return 'Erreur serveur - veuillez réessayer plus tard';
      default: return 'Erreur inconnue';
    }
  }
}

