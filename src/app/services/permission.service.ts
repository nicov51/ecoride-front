import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {User} from "../core/models/user/User";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private authService = inject(AuthService);

  private get currentUser(): User | null {
    return this.authService.currentUserSignal();
  }
  // methode some() pour verifier la presence d'un element dans 1 tableau
  hasRole(roleLabel: string): boolean {
    if (!this.currentUser?.roles) return false;
    return this.currentUser.roles.some(role => role.label === roleLabel);
  }
  isDriver(): boolean {
    return this.hasRole('driver')
  }
  isPassenger(): boolean {
    return this.hasRole('passenger')
  }
  canCreateRide(): boolean {
    return this.isDriver();
  }
  canBookRide(): boolean {
    return this.isPassenger();
  }
}
