import {Role} from "./role";

export interface UserDto {
  id: number;
  name: string;
  firstName?: string;
  email: string;
  pseudo?: string;
  isSuspended: boolean;
  suspendedAt?: string | null;
  roles: Role[];
  employeeNumber?: string;
}
