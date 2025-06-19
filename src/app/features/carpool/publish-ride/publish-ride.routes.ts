import { Routes } from '@angular/router';
import {RidePublishShellComponent} from "./ui/ride-publish-shell/ride-publish-shell.component";
import {Step2ItineraryComponent} from "./ui/step2-itinerary/step2-itinerary.component";
import {Step3DetailsComponent} from "./ui/step3-details/step3-details.component";
import {Step1RideInfoComponent} from "./ui/step1-ride-info/step1-ride-info.component";


export const PUBLISH_RIDE_ROUTES: Routes = [
  {
    path: '',
    component: RidePublishShellComponent,
    children: [
      { path: '', redirectTo: 'infos-trajet', pathMatch: 'full' },
      { path: 'infos-trajet', component: Step1RideInfoComponent },
      { path: 'itineraire', component: Step2ItineraryComponent },
      { path: 'details', component: Step3DetailsComponent },
    ],
  },
];
