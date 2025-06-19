import {Component, Input} from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormGroup, FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RideDetailsComponent} from "../../ride-details/ride-details.component";
import {SearchParams} from "../../../../core/models/ride/SearchParams";

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    MatSlideToggle,
    FormsModule,
    MatFormField,
    MatButton,
    MatLabel,
    MatInput,
    DatePipe,
    RideDetailsComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  //Todo : verifier le typage SearchParams?
  searchParams: SearchParams | null = null;

 @Input() filters!: SearchParams | null;
 @Input() filterForm!: FormGroup;

  results = [
    {
      id: 1,
      departure: 'Paris',
      arrival: 'Lyon',
      date: new Date(),
      time: '15:00',
      availableSeats: 3,
      price: 25,
      isEco: true,
      superDriver: true,
      verifiedProfile: true,
      driver: {
        name: 'Alice',
        photo: '/assets/user1.jpg',
        rating: 4.8,
        isVerified: true,
      },
    },
    // ... autres trajets fictifs
  ];

  ecoOnly = false;
  maxPrice: number = 50;

  get filteredRides() {
    if (!this.searchParams) return [];

    let rides = this.results.filter((ride) => {
      const eco = this.filterForm.get('electricOnly')?.value;
      const superDriver = this.filterForm.get('superDriver')?.value;
      const verified = this.filterForm.get('verifiedProfile')?.value;
      const timeRange = this.filterForm.get('timeRange')?.value;

      // simulate mock ride time
      const hour = new Date(ride.date).getHours();

      const inTimeRange =
        timeRange === 'all' ||
        (timeRange === 'morning' && hour >= 6 && hour < 12) ||
        (timeRange === 'afternoon' && hour >= 12 && hour < 18) ||
        (timeRange === 'evening' && hour >= 18);

      return (
        (!eco || ride.isEco) &&
        (!superDriver || ride.superDriver) &&
        (!verified || ride.verifiedProfile) &&
        inTimeRange
      );
    });

    const sortBy = this.filterForm.get('sortBy')?.value;
    if (sortBy === 'price') {
      rides.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'earliest') {
      rides.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'closest') {
      // TODO: ajouter distance calculée (non dispo ici)
    }

    return rides;
  }





}
