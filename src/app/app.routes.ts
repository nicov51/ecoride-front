import { Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {authGuard} from "./guards/auth.guard";
import {RoleGuard} from "./guards/role.guard";

export const routes: Routes = [
  { path: '',
    component: MainLayoutComponent,
    children: [

      { path: '', component: HomeComponent },
      {
        path: 'user',
        loadChildren: () =>
          import('./features/user-space/user-space.routes')
        .then(m => m.USER_SPACE_ROUTES)
      },
      {
        path: 'publier',
        loadChildren: () =>
          import('./features/carpool/publish-ride/publish-ride.routes').then(m => m.PUBLISH_RIDE_ROUTES)
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./features/carpool/search/search.component').then(m => m.SearchComponent)
      },
      {
        path: 'rides/:id',  //ride-details
        loadComponent: () =>
          import('./features/carpool/ride-details/ride-details.component').then(m => m.RideDetailsComponent)
      },
      { path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
      },
      { path: 'admin',
        // canActivate: [authGuard, RoleGuard('Admin')],
        loadChildren: () =>
          import('./features/admin/admin.routes').then(m =>m.ADMIN_ROUTES)
      },
      { path: 'employees',
        loadChildren: () =>
          import('./features/employees/employees.routes').then(m => m.EMPLOYEES_ROUTES)
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'mentions-legales',
        loadComponent: () =>
          import('./features/legal/mentions-legales/mentions-legales.component').then(m => m.MentionsLegalesComponent)
      },
      {
        path: 'politique-confidentialite',
        loadComponent: () =>
          import('./features/legal/politique-confidentialite/politique-confidentialite.component').then(m => m.PolitiqueConfidentialiteComponent)
      },
      {
        path: 'cgv',
        loadComponent: () =>
          import('./features/legal/cgv/cgv.component').then(m => m.CgvComponent)
      },
      {
        path: 'cookies',
        loadComponent: () =>
          import('./features/legal/cookies/cookies.component').then(m => m.CookiesComponent)
      },
      {
        path: 'rgpd',
        loadComponent: () =>
          import('./features/legal/rgpd/rgpd.component').then(m => m.RgpdComponent)
      }
    ],
  },
];
