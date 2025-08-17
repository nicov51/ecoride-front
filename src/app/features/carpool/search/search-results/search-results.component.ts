import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RideDetailsComponent} from "../../ride-details/ride-details.component";
import {MatIcon} from "@angular/material/icon";
import {RideCardComponent} from "../../ride-card/ride-card.component";
import {Ride} from "../../../../core/models/ride/ride";

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
    NgForOf,
    MatIcon,
    RideCardComponent
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  @Input() rides: Ride[] | null = null;
  @Input() suggestedRides: Ride[] | null = null;
  @Output() join = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<Ride>(); // Transmet l'objet Ride au parent search

  handleJoin(rideId: number) {
    this.join.emit(rideId);
  }
  onViewDetails(ride: Ride) {
    this.viewDetails.emit(ride);
  }
}
