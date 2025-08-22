import {Component, inject, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {CookieService} from "../../../services/cookie.service";

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatSlideToggle,
    FormsModule,
    MatButton,
    MatCardTitle,
  ],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css'
})
export class CookiesComponent {
  private cookieService = inject(CookieService);

  // Préférences actuelles
  analyticsEnabled = signal(false);
  marketingEnabled = signal(false);

  // États
  saveStatus = signal<'idle' | 'saving' | 'saved'>('idle');

  ngOnInit() {
    const preferences = this.cookieService.getPreferences();
    this.analyticsEnabled.set(preferences.analytics);
    this.marketingEnabled.set(preferences.marketing);
  }

  async savePreferences() {
    this.saveStatus.set('saving');

    const preferences = {
      analytics: this.analyticsEnabled(),
      marketing: this.marketingEnabled()
    };

    try {
      this.cookieService.savePreferences(preferences);
      this.saveStatus.set('saved');

      // Reset après 3 secondes
      setTimeout(() => this.saveStatus.set('idle'), 3000);
    } catch (error) {
      console.error('Erreur sauvegarde cookies:', error);
      this.saveStatus.set('idle');
    }
  }

  acceptAll() {
    this.analyticsEnabled.set(true);
    this.marketingEnabled.set(true);
    this.savePreferences();
  }

  rejectAll() {
    this.analyticsEnabled.set(false);
    this.marketingEnabled.set(false);
    this.savePreferences();
  }
}
