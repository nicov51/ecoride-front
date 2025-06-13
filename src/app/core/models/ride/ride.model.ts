// import { User } from '../user/user.model';
// import { Car } from '../vehicle/car.model';
//
// export type RideStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';
//
// export interface Ride {
//   id: number;
//   departureDate: Date;
//   departurePlace: string;
//   arrivalDate: Date;
//   arrivalPlace: string;
//   departureTime: string; // Ou `Date` si tu gères l'heure séparément
//   arrivalTime: string;
//   seats: number;
//   price: number;
//   status: RideStatus;
//   driver: User; // Relation avec User
//   car: Car;     // Relation avec Car
// }
//
// export interface Participation {
//   id: number;
//   status: string;
//   joinedAt: Date;
//   user: User;   // Relation
//   ride: Ride;   // Relation
// }
//
// export interface Review {
//   id: number;
//   comment: string;
//   rating: number;
//   status: string;
//   author: User; // Relation
//   ride: Ride;   // Relation
// }
