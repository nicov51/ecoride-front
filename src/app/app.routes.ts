import { Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";

export const routes: Routes = [
  { path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      // { path: 'publier', loadComponent: () => import('./features/publier/publier.component').then(m => m.PublierComponent) },
      // { path: 'rechercher', loadComponent: () => import('./features/rechercher/rechercher.component').then(m => m.RechercherComponent) },
      // { path: 'auth', loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent) },
    ],
  },
];
