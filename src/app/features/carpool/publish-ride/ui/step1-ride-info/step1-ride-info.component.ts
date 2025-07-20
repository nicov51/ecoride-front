import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Car} from "../../../../../core/models/user/Car";
import {Router} from "@angular/router";
import {RidePublishService} from "../../data-access/ride-publish.service";
import {AuthService} from "../../../../../services/auth.service";
import {CarService} from "../../../../../services/car.service";
import {GeocodingResult, GeocodingService} from "../../../../../services/geocoding.service";
import {catchError, debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap} from "rxjs";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
  selector: 'app-step1-ride-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatButton,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    NgForOf,
    NgIf,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe
  ],
  templateUrl: './step1-ride-info.component.html',
  styleUrl: './step1-ride-info.component.css'
})
export class Step1RideInfoComponent implements OnInit {

  rideForm!: FormGroup;
  cars: Car[] = [];
  filteredDepartureOptions$!: Observable<GeocodingResult[]>;
  filteredArrivalOptions$!: Observable<GeocodingResult[]>;

  private services = {
    auth: inject(AuthService),
    car: inject(CarService),
    geocoding: inject(GeocodingService),
    ridePublish: inject(RidePublishService)
  };
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.setupAutocomplete();
    this.loadUserCars();
    // Debug temporaire
    this.filteredArrivalOptions$.subscribe(results => {
      console.log('Résultats arrivée:', results);
    });
  }

  private initForm(): void {
    this.rideForm = this.fb.group({
      departurePlace: ['', Validators.required],
      arrivalPlace: ['', Validators.required],
      departureDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      carId: [null, Validators.required],
    });
  }

  private setupAutocomplete(): void {
    this.filteredDepartureOptions$ = this.createAutocompleteStream('departurePlace');
    this.filteredArrivalOptions$ = this.createAutocompleteStream('arrivalPlace');
  }

  private createAutocompleteStream(controlName: string): Observable<GeocodingResult[]> {
    return this.rideForm.get(controlName)!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        // Si query est un objet (sélection utilisateur), on ignore
        if (typeof query !== 'string') {
          return of([] as GeocodingResult[]);
        }

        const trimmedQuery = query.trim();
        return trimmedQuery.length >= 3
          ? this.services.geocoding.geocode(trimmedQuery).pipe(
            catchError(() => of([]as GeocodingResult[]))
          )
          : of([]);
      })
    );
  }


  private loadUserCars(): void {
    const userId = this.services.auth.currentUserSignal()?.id;
    if (userId) {
      this.services.car.getUserCars(userId).subscribe({
        next: cars => this.cars = cars,
        error: err => console.error('Erreur récupération des voitures', err)
      });
    }
  }
  trackByFn(index: number, item: GeocodingResult): string {
    return `${item.lat},${item.lon}`; // lat et lon comme identifiant unique
  }
  displayFn(result: GeocodingResult | string | null): string {
    if (!result) return '';
    if (typeof result === 'string') return result;
    return result.display_name;
  }

  onNextStep(): void {
    if (this.rideForm.valid) {
      const formValue = this.rideForm.value;

      // Combine date et heure
      const departureDate = new Date(formValue.departureDate);
      const [hours, minutes] = formValue.departureTime.split(':').map(Number);
      departureDate.setHours(hours, minutes, 0, 0);

      // Prépare les données
      const rideData = {
        ...formValue,
        departureDateTime: departureDate.toISOString(),
        departurePlace: typeof formValue.departurePlace === 'string'
          ? formValue.departurePlace
          : formValue.departurePlace.display_name,
        arrivalPlace: typeof formValue.arrivalPlace === 'string'
          ? formValue.arrivalPlace
          : formValue.arrivalPlace.display_name
      };

      this.services.ridePublish.setRideData(rideData);
      this.router.navigate(['/publier/itineraire']);
    }
  }
}
