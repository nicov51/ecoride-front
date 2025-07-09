import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

interface SidebarItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatNavList,
    MatListItem,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatIconButton,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Mes infos', icon: 'account_circle', path: 'app-profile' },
    { label: 'Mes préférences', icon: 'tune', path: 'app-preferences' },
    { label: 'Mes véhicules', icon: 'directions_bus', path: 'app-cars' },
    { label: 'Gérer mes covoiturages', icon: 'directions_car', path: 'app-my-rides' },
    { label: 'Mon solde', icon: 'account_balance_wallet', path: 'app-wallet' },
    { label: 'Historique', icon: 'history', path: 'app-history' },
    { label: 'Mes alertes', icon: 'notifications', path: 'app-alerts' },
    { label: 'Mes avis', icon: 'star_rate', path: 'app-reviews' },
    { label: 'Se déconnecter', icon: 'logout', path: '' },
    { label: 'Supprimer mon compte', icon: 'delete_forever', path: '' },
  ];

  // Ouvre par défaut si desktop
  drawerOpened = window.innerWidth >= 768;

  // Pour afficher le bouton menu uniquement en mobile
  isMobile = window.innerWidth < 768;

  constructor() {
    // On écoute le resize de la fenêtre
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      this.drawerOpened = !this.isMobile;
    });
  }

  // Appelé quand on clique sur un item : referme la sidebar si mobile
  onItemClick() {
    if (this.isMobile) {
      this.drawerOpened = false;
    }
  }

  // Bouton menu en mobile
  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }
}
