import {Routes} from "@angular/router";
import {AdminLayoutComponent} from "./admin.components/admin-layout/admin-layout.component";
import {AdminDashboardComponent} from "./admin.components/admin-dashboard/admin-dashboard.component";

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: AdminDashboardComponent},
    ],
  }
];
