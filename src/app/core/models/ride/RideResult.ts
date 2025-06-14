
//RideResult = vue enrichie pour l'affichage dans la UI
// (avec driverName, verifiedProfile, superDriver, isEco, etc.)

export interface RideResult {
  id: number;
  departure: string;
  arrival: string;
  date: Date;
  time: string;
  availableSeats: number;
  price: number;
  isEco: boolean;
  superDriver: boolean;
  verifiedProfile: boolean;
  driver: {
    name: string;
    photo: string;
    rating: number;
    isVerified: boolean;
  };
}
