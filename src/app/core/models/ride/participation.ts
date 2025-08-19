export interface Participation {
  id: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  joinedAt: Date;
  rideId: number;
  user: {
    id: number;
    name: string;
  };
}
