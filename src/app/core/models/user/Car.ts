export interface Car {
  id: number;
  model: string;
  registration: string;
  fuel: FuelType;
  color: string;
  firstRegistration: Date;
  brandId: number;
}

export enum FuelType {
  ELECTRIC = 'electric',
  DIESEL = 'diesel',
  GASOLINE = 'gasoline'
}

