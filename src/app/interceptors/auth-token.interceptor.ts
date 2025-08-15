import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
const tokenService = inject(TokenService);
const token = tokenService.getToken();

  console.log('Interceptor:', req.url, '| Token:', token);

// Ne pas modifier les requêtes d'authentification
  if ( req.url.includes('/auth/')) {
    return next(req);
  }
//pour tout le reste on passe le token dans les en tetes
  if (token) {
    const reqToSend = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
    return next(reqToSend);
  }
  return next(req); // Fallback sans token
};
