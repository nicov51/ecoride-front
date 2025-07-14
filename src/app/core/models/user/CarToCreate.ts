export interface CarToCreate {
  model: string;
  registration: string;
  fuel: 'ELECTRIC' | 'DIESEL' | 'GASOLINE';
  color: string;
  firstRegistration: Date;
  brandId: number;
}
