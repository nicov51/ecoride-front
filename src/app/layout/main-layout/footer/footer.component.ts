import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private router = inject(Router);

  //pour ouvrir le gestionnaire de cookies
  manageCookies() {
    this.router.navigate(['/legal/cookies']);
    console.log('Ouvrir gestionnaire cookies');
  }
}
