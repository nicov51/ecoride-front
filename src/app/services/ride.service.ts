import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CreateRideDto} from "../core/models/ride/create-ride.dto";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private http: HttpClient) { }

  createRide(rideData: CreateRideDto){
    return this.http.post(`${environment.apiUrl}/api/rides`, rideData)
  }
}
