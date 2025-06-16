import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

interface RideFormValue {
  departurePlace: string;
  arrivalPlace: string;
  departureDate: Date;
  departureTime: string;
  carId: number;
}

@Injectable({
  providedIn: 'root'
})

export class RidePublishService {

//stockage provisoire des datas, dans le localstorage par la suite ?
  private rideData = new BehaviorSubject<Partial<RideFormValue>>({});

  //on rend ces données ecoutables
  rideData$ = this.rideData.asObservable();

  //{...A, ...B}  signifie que B ecrase A
  setRideStep1(data: Partial<RideFormValue>) {
    this.rideData.next({...this.rideData.value,...data});
  }

  getRideData(): Partial<RideFormValue> {
    return this.rideData.value;
  }

  clear(){
    this.rideData.next({});
  }


}
