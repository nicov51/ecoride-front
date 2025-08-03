import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CreateRideDto} from "../core/models/ride/create-ride.dto";
import {Ride} from "../core/models/ride/ride";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private http: HttpClient) { }

  createRide(rideData: CreateRideDto){
    return this.http.post(`${environment.apiUrl}/api/rides`, rideData)
  }

  getMyRides(userId: number): Observable<Ride[]> {
    return this.http.get<Ride[]>(
      `${environment.apiUrl}/api/rides/by-user?userId=${userId}&includeZones=true`
    ).pipe(
      map(rides => rides.map(ride => ({
        ...ride,
        departureDateTime: new Date(ride.departureDateTime),
        arrivalDateTime: new Date(ride.arrivalDateTime)
      })))
    );
  }
  //Todo: creer une methode getLastPreferences pour pre-charger
  //ce qu'a saisi l'utilisateur comme preferences precedement. (utilisable dans le step3)
}
