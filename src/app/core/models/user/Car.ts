export interface Car {
  id: number;
  model: string;
  registration: string;
  fuel: FuelType;
  color: string;
  firstRegistration: Date;
}

export enum FuelType {
  ELECTRIC = 'electric',
  DIESEL = 'diesel',
  GASOLINE = 'gasoline'
}

