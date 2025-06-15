import {Car} from "../user/Car";
import {User} from "../user/User";

export interface Ride {
  id: number;
  departurePlace: string;
  arrivalPlace: string;
  departureDate: Date;
  departureTime: string;
  seats: number;
  price: number;
  car: Car;
  driver: User;
}

