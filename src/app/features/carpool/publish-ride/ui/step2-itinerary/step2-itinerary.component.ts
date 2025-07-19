import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {RidePublishService} from "../../data-access/ride-publish.service";
import {MapComponent} from "../../data-access/map/map.component";
import {CarpoolZoneService} from "../../../../../services/carpool-zone.service";
import {CarpoolZone} from "../../../../../core/models/ride/carpool-zone.model";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-step2-itinerary',
  standalone: true,
  imports: [
    MatButton,
    MapComponent,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    NgForOf
  ],
  templateUrl: './step2-itinerary.component.html',
  styleUrl: './step2-itinerary.component.css'
})


export class Step2ItineraryComponent implements OnInit {

  departurePlace: string = '';
  arrivalPlace: string = '';
  departureZones: CarpoolZone[] = [];
  arrivalZones: CarpoolZone[] = [];
  departureZoneId: number | null = null;
  arrivalZoneId: number | null = null;

  private ridePublishService = inject(RidePublishService);
  private carpoolZoneService = inject(CarpoolZoneService);
  constructor(private router: Router) {}

  ngOnInit() {
    const data = this.ridePublishService.getRideData(); // ou autre méthode
    this.departurePlace = data?.departurePlace || '';
    this.arrivalPlace = data?.arrivalPlace || '';
    // on recupere les zones de covoit pour les afficher ensuite dans le select
    this.carpoolZoneService.getAllZones().subscribe({
      next: (zones) => {
        this.departureZones = zones;
        this.arrivalZones = zones;
      },
      error: (err) => console.error('Erreur survenue lors de la récupération de la zone', err),
    });

  }
  onConfirmItinerary() {
    // On enregistre les zones choisies dans le service
    this.ridePublishService.setRideData({
      departureZoneId: this.departureZoneId,
      arrivalZoneId: this.arrivalZoneId

    })
    this.router.navigate(['/publier/details']);
  }

  onGoBack() {
    this.router.navigate(['/publier']);
  }
}
