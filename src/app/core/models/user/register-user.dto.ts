export interface RegisterUserDto {
  name: string;
  firstName: string;
  email: string;
  password: string;
  address: string;
  birthDate: string; // format ISO
  pseudo: string;
  phone: string;
  picture?: string | null;
  isVerified?: boolean;
}
