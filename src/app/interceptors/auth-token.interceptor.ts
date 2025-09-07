import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {TokenService} from "../services/token.service";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
const tokenService = inject(TokenService);
const token = tokenService.getToken();

  console.log('Interceptor:', req.url, '| Token:', token);

// Ne pas modifier les requêtes d'authentification
  if ( req.url.includes('/auth/')) {
    console.log('Requête auth - pas de token ajouté');
    return next(req);
  }
//pour tout le reste on passe le token dans les en tetes
  if (token) {
    const reqToSend = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
    console.log('Token ajouté à la requête');
    return next(reqToSend);
  }
  console.log('Pas de token trouvé !');
  return next(req); // Fallback sans token
};
