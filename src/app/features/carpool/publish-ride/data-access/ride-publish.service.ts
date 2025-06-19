import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {RideFormData} from "../../../../core/models/ride/ride-form-data";

// interface RideFormValue {
//   departurePlace: string;
//   arrivalPlace: string;
//   departureDate: Date;
//   departureTime: string;
//   carId: number;
// }

@Injectable({
  providedIn: 'root'
})

export class RidePublishService {

//stockage provisoire des datas, dans le localstorage par la suite ?
  private rideData = new BehaviorSubject<Partial<RideFormData>>({});

  //on rend ces données ecoutables
  rideData$ = this.rideData.asObservable();

  //{...A, ...B}  signifie que B ecrase A
  setRideData(data: Partial<RideFormData>) {
    this.rideData.next({...this.rideData.value,...data});
  }

  getRideData(): Partial<RideFormData> {
    return this.rideData.value;
  }

  clear(){
    this.rideData.next({});
  }


}
