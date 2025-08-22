import {Component, inject, OnInit, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {CookieService} from "../../../services/cookie.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    RouterLink
  ],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css'
})
export class CookieBannerComponent implements OnInit {
  private cookieService = inject(CookieService);
  private router = inject(Router);

  hasConsent = signal(false);

  ngOnInit() {
    this.hasConsent.set(this.cookieService.hasConsent());
  }

  acceptAll() {
    this.cookieService.savePreferences({
      analytics: true,
      marketing: true
    });
    this.hasConsent.set(true);
  }

  rejectAll() {
    this.cookieService.savePreferences({
      analytics: false,
      marketing: false
    });
    this.hasConsent.set(true);
  }

  manageCookies() {
    this.router.navigate(['/cookies']);
  }
}
