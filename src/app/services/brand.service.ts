import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Brand} from "../core/models/user/brand";
import {environment} from "../../environments/environment";
import {CreateBrandDto} from "../core/models/user/create-brand.dto";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) {}
  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${environment.apiUrl}/api/brand`);
  }
  create(brand: CreateBrandDto): Observable<Brand> {
    return this.http.post<Brand>(`${environment.apiUrl}/api/brand`, brand);
  }
}
