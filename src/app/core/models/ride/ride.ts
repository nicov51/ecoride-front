import {Car} from "../user/Car";
import {User} from "../user/User";
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
  car: Car;
  driver: User; departureZone?: {
    id: number;
    label: string;
    lat: number;
    lng: number;
  };
  arrivalZone?: {
    id: number;
    label: string;
    lat: number;
    lng: number;
  };


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

