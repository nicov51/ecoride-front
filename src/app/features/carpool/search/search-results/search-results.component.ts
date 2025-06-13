import {Component, Input} from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {DatePipe} from "@angular/common";
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
    RideDetailsComponent
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  //Todo : verifier le typage SearchParams?

 @Input() filters!: SearchParams;

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
      driver: {
        name: 'Alice',
        photo: '/assets/user1.jpg',
        rating: 4.8,
      },
    },
    // ... autres trajets fictifs
  ];

  ecoOnly = false;
  maxPrice: number = 50;

  get filteredRides() {
    return this.results.filter((ride) => {
      return (!this.ecoOnly || ride.isEco) && ride.price <= this.maxPrice;
    });
  }

  showDetails(id: number) {
    alert('Détails du trajet #' + id);
  }

  suggestAlternativeDate() {
    alert('Voici une autre date dispo');
  }

  get closestDate() {
    return new Date();
  }
}
