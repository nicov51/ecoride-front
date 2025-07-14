import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";
import {catchError, throwError} from "rxjs";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
const tokenService = inject(TokenService);
const token = tokenService.getToken();

// Ne pas modifier les requêtes d'authentification ou sans token
  if (!token || req.url.includes('/auth/')) {
    return next(req);
  }
//pour tout le reste on passe le token dans les en tetes
  const reqToSend =req.clone({
    setHeaders: {
      'Authorization': `Bearer ${token}`
    }
  });
  return next(reqToSend).pipe(
    catchError(err => {
      if (err.status === 401) {
        tokenService.removeToken();
      }
      return throwError(() => err);
    })
  );
};
