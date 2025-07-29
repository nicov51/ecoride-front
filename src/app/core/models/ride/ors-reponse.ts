export interface ORSSummary {
  distance: number;
  duration: number;
}

export interface ORSRoute {
  summary: ORSSummary;
  geometry: string; // Format polyline encodé
  bbox: [number, number, number, number];
  way_points: [number, number];
}

export interface ORSMetadata {
  attribution: string;
  service: string;
  timestamp: number;
  // ... autres champs si nécessaire
}

export interface ORSResponse {
  bbox: [number, number, number, number];
  routes: ORSRoute[];
  metadata: ORSMetadata;
}



