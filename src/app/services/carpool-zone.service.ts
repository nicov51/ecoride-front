import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarpoolZone} from "../core/models/ride/carpool-zone.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarpoolZoneService {

  constructor(private http: HttpClient) { }

  getAllZones(): Observable<CarpoolZone[]> {
    return this.http.get<CarpoolZone[]>(`${environment.apiUrl}/api/carpool-zones`);
  }
}
