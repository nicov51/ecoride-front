import {Component, computed, inject, OnInit} from '@angular/core';
import {DatePipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    FormsModule,
    DatePipe,
    MatIcon,
    MatIconButton,
    MatMiniFabButton,
    JsonPipe,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private authService = inject(AuthService);

  // Signal User directement depuis le AuthService
  user = this.authService.currentUserSignal;

  constructor() {
    this.authService.loadUserIfTokenPresent?.();
  }

  edit(field: string) {
    console.log(`Édition du champ ${field}`);
    // À implémenter avec un dialogue ou formulaire
  }

  changePhoto() {
    console.log('Changer la photo de profil');
    // À implémenter
  }

  changePassword() {
    console.log('Changer le mot de passe');
    // À implémenter
  }

  getProfileImage(): string {
    const user = this.user(); // Signal = fonction
    if (!user?.picture) return '/images/avatars/default-user.jpg';
    return 'data:image/jpeg;base64,' + user.picture;
  }
}
