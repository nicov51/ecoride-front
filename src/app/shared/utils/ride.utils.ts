import {Ride} from "../../core/models/ride/ride";

export function getAvailableSeats(ride: Ride): number {
  if (!ride.participations) return ride.seats;
  const confirmed = ride.participations.filter(p => p.status === 'confirmed').length;
  return ride.seats - confirmed;
}
