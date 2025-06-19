import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {MapService} from "../map.service";
import * as L from 'leaflet';
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit {

  private mapService = inject(MapService);
  @Input() departurePlace?: string;
  @Input() arrivalPlace?: string;

  private map!: L.Map;



  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(async () => {
      try {
        await this.initMap();
      } catch (err) {
        console.error('Erreur dans initMap:', err);
      }
    });
  }

  private async initMap() {

    if (!this.departurePlace || !this.arrivalPlace) {
      console.error('L’adresse de départ ou d’arrivée est manquante.');
      return;
    }
    // Création de la carte Leaflet
    this.map = L.map('map').setView([46.5, 2.5], 6);

    // Corrige les icônes Leaflet (classique bug de base)
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });

    // Ajout des tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© OpenStreetMap contributors'
    }).addTo(this.map);

    try {
      // Géocodage des adresses
      const startResult = await firstValueFrom(
        this.mapService.geocodeAddress(this.departurePlace)
      );
      const endResult = await firstValueFrom(
        this.mapService.geocodeAddress(this.arrivalPlace)
      );

      if (!startResult?.length || !endResult?.length) {
        throw new Error('Adresse introuvable');
      }

      const [start] = startResult;
      const [end] = endResult;

      const startCoords: [number, number] = [Number(start.lon), Number(start.lat)];
      const endCoords: [number, number] = [Number(end.lon), Number(end.lat)];

      // Ajout des marqueurs
      L.marker([start.lat, start.lon]).addTo(this.map).bindPopup('Départ');
      L.marker([end.lat, end.lon]).addTo(this.map).bindPopup('Arrivée');

      // Récupération et affichage de l'itinéraire

      // Appel de l’API OpenRouteService
      const routeData = await firstValueFrom(
        this.mapService.getItinerary(startCoords, endCoords)
      );

      console.log(routeData)

      if (
        !routeData ||
        !routeData.features ||
        routeData.features.length === 0
      ) {
        console.error("Erreur dans la réponse de l'itinéraire", routeData);
        return;
      }

      //utilisation des coordonnées
      const geometry = routeData.features[0].geometry;

      if (!geometry || !geometry.coordinates) {
        console.error("Géométrie manquante dans la réponse", geometry);
        return;
      }
      console.log('Coordonnées de la route:', geometry.coordinates);

      const latlngs: [number, number][] = geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]); // Leaflet = [lat, lng]

      const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(this.map);
      this.map.fitBounds(polyline.getBounds());
    } catch (err) {
      console.error('Erreur chargement carte:', err);
    }
  }


}
