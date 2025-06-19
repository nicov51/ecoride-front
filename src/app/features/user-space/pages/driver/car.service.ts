import { Injectable } from '@angular/core';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }
  getUserCars(){
    return of([
      {
        id: 1,
        model: 'Peugeot 208',
        registration: 'AB-123-CD',
        fuel: 'essence',
        color: 'Bleu',
        firstRegistration: new Date('2019-05-15')
      },
      {
        id: 2,
        model: 'Renault Zoé',
        registration: 'EF-456-GH',
        fuel: 'électrique',
        color: 'Blanc',
        firstRegistration: new Date('2021-02-20')
      }
    ])
  }
}
