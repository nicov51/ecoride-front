import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DatePipe, NgForOf} from "@angular/common";


interface Vehicle {
  id: number;
  model: string;
  registration: string;
  fuel: 'essence' | 'diesel' | 'électrique';
  color: string;
  firstRegistration: Date;
}

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatIconButton,
    MatButton,
    NgForOf,
    DatePipe
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {

  vehicles: Vehicle[] = [
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
  ];

  addVehicle() {
    // Version simple sans popup
    this.vehicles.push({
      id: this.vehicles.length + 1,
      model: 'Nouveau véhicule',
      registration: 'XX-XXX-XX',
      fuel: 'essence',
      color: 'Gris',
      firstRegistration: new Date()
    });
  }

  removeVehicle(id: number) {
    this.vehicles = this.vehicles.filter(v => v.id !== id);
  }

}
