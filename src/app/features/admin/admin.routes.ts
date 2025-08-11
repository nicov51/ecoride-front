import {Routes} from "@angular/router";
import {AdminLayoutComponent} from "./admin.components/admin-layout/admin-layout.component";
import {AdminDashboardComponent} from "./admin.components/admin-dashboard/admin-dashboard.component";
import {AdminUsersComponent} from "./admin.components/admin-users/admin-users.component";
import {AdminChartsComponent} from "./admin.components/admin-charts/admin-charts.component";

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: AdminDashboardComponent},
      { path: 'users', component: AdminUsersComponent},
      { path: 'charts', component: AdminChartsComponent},
    ],
  }
];
