/**
 * Utilitaires géographiques
 */
import {CarpoolZone} from "../../core/models/ride/carpool-zone.model";

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calcule la distance entre deux points en km (formule Haversine)
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(degrees: number): number {
  return degrees * Math.PI / 180;
}

/**
 * Filtre les zones par proximité
 */
export function filterZonesByProximity(
  zones: CarpoolZone[],
  center: Coordinates,
  radiusKm: number
): CarpoolZone[] {
  return zones.filter(zone => {
    const distance = calculateDistance(
      { lat: zone.lat, lng: zone.lng },
      center
    );
    return distance <= radiusKm;
  });
}
