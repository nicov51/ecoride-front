import {Routes} from "@angular/router";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {MyRidesComponent} from "./pages/driver/my-rides/my-rides.component";
import {BookedRidesComponent} from "./pages/passenger/booked-rides/booked-rides.component";
import {VehiclesComponent} from "./pages/driver/vehicles/vehicles.component";
import {PreferencesComponent} from "./pages/driver/preferences/preferences.component";
import {HistoryComponent} from "./pages/shared/history/history.component";
import {ReviewsComponent} from "./pages/shared/reviews/reviews.component";
import {WalletComponent} from "./pages/shared/wallet/wallet.component";
import {AlertsComponent} from "./pages/shared/alerts/alerts.component";

export const USER_SPACE_ROUTES: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: '', redirectTo: 'app-profile', pathMatch: 'full' },

      { path: 'app-profile', component: ProfileComponent },
      { path: 'app-preferences', component: PreferencesComponent },
      { path: 'app-my-rides', component: MyRidesComponent },
      { path: 'app-wallet', component: WalletComponent },
      { path: 'app-history', component: HistoryComponent },
      { path: 'app-vehicles', component: VehiclesComponent },
      { path: 'app-alerts', component: AlertsComponent },
      { path: 'app-reviews', component: ReviewsComponent },
      //{ path: 'app-logout', component: LogoutComponent },
      //{ path: 'app-delete-account', component: DeleteAccountComponent },

      // Passager
      {
        path: 'passenger',
        //canActivate: [PassengerGuard],
        component: BookedRidesComponent
      }
    ]
  }
];
