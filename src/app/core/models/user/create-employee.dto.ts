export interface CreateEmployeeDto {
  name: string;
  firstName: string;
  email: string;
  password: string;
  phone?: string;
  employeeNumber?: string;
}
