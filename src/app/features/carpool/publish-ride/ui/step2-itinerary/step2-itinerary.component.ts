import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {RidePublishService} from "../../data-access/ride-publish.service";
import {MapComponent} from "../../data-access/map/map.component";


@Component({
  selector: 'app-step2-itinerary',
  standalone: true,
  imports: [
    MatButton,
    MapComponent
  ],
  templateUrl: './step2-itinerary.component.html',
  styleUrl: './step2-itinerary.component.css'
})


export class Step2ItineraryComponent implements OnInit {

  departurePlace: string = '';
  arrivalPlace: string = '';

  private ridePublishService = inject(RidePublishService);


  constructor(private router: Router) {}

  ngOnInit() {
    const data = this.ridePublishService.getRideData(); // ou autre méthode
    this.departurePlace = data?.departurePlace || '';
    this.arrivalPlace = data?.arrivalPlace || '';
  }

  onConfirmItinerary() {
    this.router.navigate(['/publier/details']);
  }

  onGoBack() {
    this.router.navigate(['/publier']);
  }
}
