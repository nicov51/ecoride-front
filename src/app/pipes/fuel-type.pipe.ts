import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fuelType',
  standalone: true
})
export class FuelTypePipe implements PipeTransform {
  transform(value: string): string {
    switch(value) {
      case 'ELECTRIC': return 'Électrique';
      case 'DIESEL': return 'Diesel';
      case 'GASOLINE': return 'Essence';
      default: return value;
    }
  }
}
