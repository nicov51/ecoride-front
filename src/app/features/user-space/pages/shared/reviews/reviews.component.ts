import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";


interface Review {
  id: number;
  comment: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    MatCardContent,
    NgForOf
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviews: Review[] = [
    {
      id: 1,
      comment: 'Conducteur très agréable, trajet sans problème.',
      rating: 5,
      status: 'approved'
    },
    {
      id: 2,
      comment: 'Retard de 15 minutes au départ.',
      rating: 3,
      status: 'approved'
    },
    {
      id: 3,
      comment: 'Voiture propre mais un peu bruyante.',
      rating: 4,
      status: 'pending'
    }
  ];
}
