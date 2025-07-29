import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {RideFormData} from "../../../../core/models/ride/ride-form-data";
import {AuthService} from "../../../../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class RidePublishService {

//stockage provisoire des datas, dans le localstorage par la suite ?
  private rideData = new BehaviorSubject<Partial<RideFormData>>({});

  //on rend ces données ecoutables
  rideData$ = this.rideData.asObservable();

  constructor(private authService: AuthService) {}

  //{...A, ...B}  signifie que B ecrase A
  setRideData(data: Partial<RideFormData>) {
    this.rideData.next({...this.rideData.value,...data});
  }

  getRideData(): Partial<RideFormData> {
    const user = this.authService.currentUserSignal();
    return {
      ...this.rideData.value,
      driverId: user?.id};
  }

  clear(){
    this.rideData.next({});
  }
}
