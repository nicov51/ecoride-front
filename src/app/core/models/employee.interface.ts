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
export interface DashboardStats {
  pendingReviews: number;
  problemRides: number;
  totalModerated: number;
  todayActions: number;
}

export interface ModerationStats {
  totalReviews: number;
  approved: number;
  rejected: number;
  pending: number;
  todayModerated: number;
  weeklyModerated: number;
  averageResponseTime: number;
}

export interface ReviewCardData {
  id: number;
  comment: string;
  rating: number;
  createdAt: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  author: {
    name: string;
    email: string;
  };
  ride: {
    id: number;
    title: string;
    date: string;
    from: string;
    to: string;
  };
}

export interface StatsResponse {
  pending: number;
  approved: number;
  rejected: number;
  problems: number;
}


