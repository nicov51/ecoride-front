import { Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";

export const routes: Routes = [
  { path: '',
    component: MainLayoutComponent,
    children: [

      { path: '', component: HomeComponent },
      {path: 'user',
      loadChildren: () => import('./features/user-space/user-space.routes')
        .then(m => m.USER_SPACE_ROUTES)},
      // { path: 'publier', loadComponent: () => import('./features/publier/publier.component').then(m => m.PublierComponent) },
      { path: 'search', loadComponent: () => import('./features/carpool/search/search.component').then(m => m.SearchComponent) },
      // { path: 'auth', loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent) },
    ],
  },
];
