import {AfterViewInit, Component, Input, OnInit, inject, Output, EventEmitter} from '@angular/core';
import * as L from 'leaflet';
import { firstValueFrom } from 'rxjs';
import { GeocodingService } from '../../../../../services/geocoding.service';
import {ItineraryService} from '../../../../../services/itinerary.service';
import {ORSResponse} from "../../../../../core/models/ride/ors-reponse";
import * as Polyline from '@mapbox/polyline';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() departurePlace?: string;
  @Input() arrivalPlace?: string;
  @Output() routeInfo = new EventEmitter<{distance: number; duration:number}>();

  private map!: L.Map;
  private geocodingService = inject(GeocodingService);
  private itineraryService = inject(ItineraryService);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Attend que le DOM soit prêt
    setTimeout(() => this.initMap().catch(err => console.error('Erreur dans initMap:', err)));
  }

  /**
   * Initialise la carte et affiche l’itinéraire
   */
  private async initMap(): Promise<void> {
    //Verif entrée
    if (!this.departurePlace || !this.arrivalPlace) {
      console.error('Adresse de départ ou d’arrivée manquante.');
      return;
    }

    // Initialisation de la carte
    this.map = L.map('map').setView([46.5, 2.5], 6);
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // 3. Géocodage adresses
    const [startResults, endResults] = await Promise.all([
      firstValueFrom(this.geocodingService.geocode(this.departurePlace)),
      firstValueFrom(this.geocodingService.geocode(this.arrivalPlace)),
    ]);
    if (!startResults.length || !endResults.length) {
      console.error('[Map] Géocodage échoué.');
      return;
    }
    const [start, end] = [startResults[0], endResults[0]];
    const startCoords: [number, number] = [Number(start.lon), Number(start.lat)];
    const endCoords: [number, number] = [Number(end.lon), Number(end.lat)];

    // 4. Ajout marqueurs
    L.marker([startCoords[1], startCoords[0]]).addTo(this.map).bindPopup('Départ');
    L.marker([endCoords[1], endCoords[0]]).addTo(this.map).bindPopup('Arrivée');

    // 5. Appel backend itinéraire
    const response: ORSResponse = await firstValueFrom(
      this.itineraryService.getItinerary({ start: startCoords, end: endCoords })
    );
    console.log('[Map] Réponse ORS reçue :', response);

    //6. on recupere la durée et la distance de l'itineraire
    const route = response.routes[0];
    this.routeInfo.emit({
      distance: route.summary.distance, //en metres
      duration: route.summary.duration, //en secondes
    })

    if (!response.routes?.[0]?.geometry) {
      console.error('Données de route invalides');
      return;
    }

// Décodage du polyline
    const decodedGeometry = Polyline.decode(response.routes[0].geometry);
    const coordinates = decodedGeometry.map(([lat, lng]) => [lat, lng] as [number, number]);
    console.log('Geometry decoded:', coordinates.slice(0, 5), '...'); // Affiche les 5 premiers points

// Affichage de l’itinéraire
    const polylineLayer = L.polyline(coordinates, { color: 'blue' }).addTo(this.map);
    this.map.fitBounds(polylineLayer.getBounds());

    console.log('[Map] Itinéraire affiché sur la carte avec succès.');
  }
}

