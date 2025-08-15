export interface CreateEmployeeDto {
  email: string;
  name: string;
  firstName: string;
  password: string;
  address: string;
  birthDate: Date;
  pseudo: string;
  phone: string;
  employeeNumber?: string;
  picture?: string;
  isVerified?: boolean;
}
