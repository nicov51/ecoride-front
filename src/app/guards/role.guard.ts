import {CanActivateFn} from "@angular/router";
import {PermissionService} from "../services/permission.service";
import {inject} from "@angular/core";

export const RoleGuard = (requiredRole: string): CanActivateFn => {
  return () => {
    const permission = inject(PermissionService);
    return permission.hasRole(requiredRole);
  }
}
