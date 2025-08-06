import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {TokenService} from "../services/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // Vérifie à la fois le signal et la présence du token
  const isAuthenticated = authService.isLogged() && tokenService.getToken();

  if (isAuthenticated) {
    return true;
  }

  // Redirige vers /login avec conservation de l'URL demandée
  // state.url contient l'URL qui a déclenché le guard
  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
}
