export interface ReviewToCreate {
  rideId: number;
  rating: number;
  comment?: string;
  isProblem: boolean;
}
