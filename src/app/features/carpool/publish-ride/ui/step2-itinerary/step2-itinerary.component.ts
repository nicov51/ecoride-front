import {Component, inject, Input, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {RidePublishService} from "../../data-access/ride-publish.service";
import {MapComponent} from "../../data-access/map/map.component";
import {CarpoolZoneService} from "../../../../../services/carpool-zone.service";
import {CarpoolZone} from "../../../../../core/models/ride/carpool-zone.model";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {formatDuration} from "../../../../../shared/utils/datetime.utils";
import {MatChip} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {RideFormData} from "../../../../../core/models/ride/ride-form-data";


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
    NgForOf,
    MatChip,
    MatIcon,
    NgIf,
    DatePipe
  ],
  templateUrl: './step2-itinerary.component.html',
  styleUrl: './step2-itinerary.component.css'
})


export class Step2ItineraryComponent implements OnInit {
  private ridePublishService = inject(RidePublishService);
  private carpoolZoneService = inject(CarpoolZoneService);
  private router = inject(Router);

  // Données du trajet
  rideData = this.ridePublishService.getRideData();
  departurePlace = this.rideData?.departurePlace ?? '';
  arrivalPlace = this.rideData?.arrivalPlace ?? '';

  // Zones
  departureZones: CarpoolZone[] = [];
  arrivalZones: CarpoolZone[] = [];
  departureZoneId: number | null = null;
  arrivalZoneId: number | null = null;

  // Infos itinéraire
  distance?: number;
  duration?: number;
  formattedDistance?: string;
  formattedDuration?: string;
  arrivalTime?: Date; //calculée coté front

  ngOnInit() {
    this.loadZones();
  }
  // charge les zones dispo en dur dans le service
  private loadZones(): void {
    this.carpoolZoneService.getAllZones().subscribe({
      next: (zones) => {
        // Pour le moment, on utilise les mêmes zones pour départ et arrivée
        this.departureZones = zones;
        this.arrivalZones = zones;

        // Sélection automatique des premières zones si disponibles
        if (zones.length > 0) {
          this.departureZoneId = zones[0].id;
          this.arrivalZoneId = zones[1]?.id || zones[0].id; // Prend la 2ème zone si existe
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des zones', err);
      }
    });
  }
  // Mettre à jour le template
  onRouteInfo(info: {distance: number; duration: number}) {
    this.distance = info.distance;
    this.duration = info.duration;
    this.formattedDistance = `${(info.distance / 1000).toFixed(1)} km`;
    this.formattedDuration = formatDuration(info.duration);

    // Calcul de l'heure d'arrivée (version simplifiée)
    if (this.rideData?.departureDateTime) {
      const departureDate = new Date(this.rideData.departureDateTime);
      this.arrivalTime = new Date(departureDate.getTime() + info.duration * 1000);
    }
  }

  // on valide l'itineraire et on passe a l'etape 3
  onConfirmItinerary() {
    if (!this.duration ||
        !this.departureZoneId ||
        !this.arrivalZoneId ||
        !this.rideData?.departureDateTime)
    // Todo: snackbar ou toast ici?
    { return; }

    const rideData: Partial<RideFormData> = {
      // on cree l'objet de base
      departureZoneId: this.departureZoneId,
      arrivalZoneId: this.arrivalZoneId,
      estimatedDuration: this.duration,
    };

    //si dispo on ajoute l'heure d'arrivée estimée
    if (this.arrivalTime) {
      rideData['arrivalDateTime'] = this.arrivalTime.toISOString();
    }

    this.ridePublishService.setRideData(rideData);
    this.router.navigate(['/publier/details']);
  }

  //retour a l'etape precedente
  onGoBack(): void {
    this.router.navigate(['/publier']);
  }
}
