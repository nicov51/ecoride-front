export interface CreateRideDto {
  departurePlace: string;
  arrivalPlace: string;
  departureDateTime: string;
  arrivalDateTime: string;
  carId: number;
  departureZoneId: number;
  arrivalZoneId: number;
  seats: number;
  price: number;
  driverId: number;

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
