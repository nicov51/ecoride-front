export interface Review {
  id: number;
  comment: string;
  rating: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  isProblem: boolean;
  reason?: string;
  rideId: number;
  userId: number;
  createdAt: Date;
}
