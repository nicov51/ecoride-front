export interface RideFormData {
  price: number;
  seats: number;
  departurePlace: string;
  arrivalPlace : string;
  // startCoords: [number, number];
  // endCoords: [number, number];
  departureDateTime: string; // Date et heure combinée ISO (ex: "2025-06-18T14:00:00")
  arrivalDateTime?: string; // Calculée avec durée et heure départ
  estimatedDuration?: number; // Durée en secondes puis converti
  carId?: number; // ou car?: { id, brand, model, ... }
  departureZoneId: number | null;
  arrivalZoneId: number | null;
  driverId?: number;

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

