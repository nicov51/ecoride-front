import { Injectable } from '@angular/core';
import {CookiePreferences} from "../core/models/others/cookie-preferences";

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly STORAGE_KEY = 'ecoride-cookie-preferences';

// recuperer les pref depuis localStorage
  getPreferences(): CookiePreferences {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Erreur lecture préférences cookies:', error);
    }

    // Valeurs par défaut
    return {
      analytics: false,
      marketing: false
    };
  }

  savePreferences(preferences: CookiePreferences): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
      console.log('Préférences cookies sauvegardées:', preferences);
    } catch (error) {
      console.error('Erreur sauvegarde préférences cookies:', error);
    }
  }

  // Vérifie si l'utilisateur a déjà donné son consentement
  hasConsent(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  //Supprime toutes les préférences
  clearPreferences(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Vérifie si un type de cookie est autorisé
  isAllowed(cookieType: 'analytics' | 'marketing'): boolean {
    const preferences = this.getPreferences();
    return preferences[cookieType];
  }
}
