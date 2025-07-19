export interface RideFormData {
  price: number;
  seats: number;
  departurePlace: string;
  arrivalPlace : string;
  startCoords: [number, number];
  endCoords: [number, number];
  departureDateTime: string; // Date ISO (ex: "2025-06-18T14:00:00")
  estimatedArrivalDateTime?: string; // Calculée avec durée et heure départ
  estimatedDuration?: number; // Durée en secondes ou minutes
  route?: [number, number][]; // Coordonnées pour affichage carte
  carId?: string; // ou car?: { id, brand, model, ... }
  departureZoneId: number | null;
  arrivalZoneId: number | null;

  options?: {
    petsAllowed?: boolean;
    luggageAllowed?: boolean;
    airConditioning?: boolean;
  };

  preferences?: {
    chat: string;
    smoking: string;
    music: string;
    pets: string;
    other: string;
  };
}

