export interface ModerateReviewDto {
  decision: 'approved' | 'rejected';
  reason?: string;
}

export interface ProblemRideResponse {
  id: number;
  rideTitle: string;
  departureDate: string;
  departurePlace: string;
  arrivalPlace: string;
  driver: {
    id: number;
    name: string;
    email: string;
  };
  passenger: {
    id: number;
    name: string;
    email: string;
  };
  review: {
    id: number;
    comment: string;
    rating: number;
    createdAt: Date;
  };
}
