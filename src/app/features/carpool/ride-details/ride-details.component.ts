import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-ride-details',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    NgOptimizedImage,
    MatCardContent,
    MatCardActions,
    DatePipe,
    MatButton
  ],
  templateUrl: './ride-details.component.html',
  styleUrl: './ride-details.component.css'
})
export class RideDetailsComponent {
  @Input() ride: any;
  @Output() showDetails = new EventEmitter<number>();
}
