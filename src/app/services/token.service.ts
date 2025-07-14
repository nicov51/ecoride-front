import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
private readonly TOKEN_KEY: string = 'auth_token';

getToken(): string | null {
  return localStorage.getItem(this.TOKEN_KEY);
}
setToken(token: string): void {
  localStorage.setItem(this.TOKEN_KEY, token);
  // Notifie les autres onglets du changement
  window.dispatchEvent(new Event('storage'));
}
removeToken(): void {
  localStorage.removeItem(this.TOKEN_KEY);
}
}
