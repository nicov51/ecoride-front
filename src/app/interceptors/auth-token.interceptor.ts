import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
const tokenService = inject(TokenService);
const token = tokenService.getToken();

// Si on a un token on le passe dans les entetes de toutes no requetes sortantes vers l'api
if (token) {
  const reqToSend =req.clone({
    setHeaders: {
      'Authorization': `Bearer ${token}`
    }
  });
  return next(reqToSend);
}
  return next(req);
};
