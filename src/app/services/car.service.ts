import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../core/models/user/Car";
import {CarToCreate} from "../core/models/user/CarToCreate";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly http = inject(HttpClient);

  getUserCars(userId: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.apiUrl}/api/cars?userId=${userId}`);
  }

  //CarToCreate sans id et on reçoit un Car complet
  createCar(car: CarToCreate, userId: number): Observable<Car> {
    return this.http.post<Car>(`${environment.apiUrl}/api/cars`, {
      ...car,
      ownerId: userId
    });
  }

  deleteCar(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/cars/${id}?userId=${userId}`);
  }
}
