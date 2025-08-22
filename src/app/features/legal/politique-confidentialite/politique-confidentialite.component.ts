import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-politique-confidentialite',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink
  ],
  templateUrl: './politique-confidentialite.component.html',
  styleUrl: './politique-confidentialite.component.css'
})
export class PolitiqueConfidentialiteComponent {
  lastUpdate = '10 juillet 2025';

}
