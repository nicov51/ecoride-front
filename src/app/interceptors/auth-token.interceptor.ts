import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service'
import {inject} from "@angular/core";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
const authService = inject(AuthService);
const token = authService.getToken();

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
