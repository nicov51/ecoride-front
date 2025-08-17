export interface SearchParams {
  // Correspondance exacte avec le backend
  from?: string;
  to?: string;
  date?: Date;
  minPrice?: number;
  seats?: number;
  electricOnly?: boolean;
  departureZoneId?: number;
  arrivalZoneId?: number;

  // Filtres supplémentaires (gérés côté front)
  frontFilters?: {
    timeRange?: 'morning' | 'afternoon' | 'evening' | 'all';
    superDriver?: boolean;
    verifiedProfile?: boolean;
  };
  sortBy?: 'earliest' | 'lowestPrice' | 'closestStart';
}
