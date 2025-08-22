import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-cgv',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './cgv.component.html',
  styleUrl: './cgv.component.css'
})
export class CgvComponent {
  lastUpdate = '15 juillet 2025';

}
