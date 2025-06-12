import { Component } from '@angular/core';
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";

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
    MatMiniFabButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  //mock provisoire
  user = {
    id: 1,
    name: 'Dupont',
    firstName: 'Jean',
    email: 'jean.dupont@example.com',
    emailVerified: true,
    phone: '0123456789',
    address: '123 Rue Exemple, Paris, France',
    birthDate: '1985-06-15',
    picture: 'images/avatars/default-user.jpg', // Mock image
    civility: 'Monsieur',
  };

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
}
