import {RideStatus} from "./ride-status.enum";

export interface Ride {
  id: number;
  departurePlace: string;
  arrivalPlace: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  seats: number;
  price: number;
  status: RideStatus;
  car: {
    id: number;
    model: string;
    brand: string;
    fuel: 'ELECTRIC' | 'DIESEL' | 'GASOLINE';
    color: string;
  };
  driver: {
    id: number;
    name: string;
    picture?: string;
  };
  departureZone: {
    id: number;
    label: string;
    lat: number;
    lng: number;
  };
  arrivalZone: {
    id: number;
    label: string;
    lat: number;
    lng: number;
  };
  participations?: {
    id: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    joinedAt?: Date;
    user: {
      id: number;
      name: string;
      picture?: string;
    };
  }[];


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

