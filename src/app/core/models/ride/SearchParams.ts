export interface SearchParams {
  departure?: string;
  arrival?: string;
  date?: Date;
  timeRange?: string;
  eco?: boolean;
  superDriver?: boolean;
  verifiedProfile?: boolean;
  sortBy?: 'earliest' | 'lowestPrice' | 'closestStart';
}
/*
il faudra ajouter les zones de covoiturage
departureZoneId: number;
arrivalZoneId: number;
*/
