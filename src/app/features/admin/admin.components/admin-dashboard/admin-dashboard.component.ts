import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from "../../../../services/admin.service";
import {RideStat} from "../../../../core/models/ride/ride-stat";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-admin.components',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
private adminService = inject(AdminService);

totalCredits: number = 0;
rideStats: RideStat[] = [];

  ngOnInit(): void {
    this.adminService.getTotalCredits().subscribe({
      next: value => this.totalCredits = value,
      error: err => console.error('Failed to load credits', err)
    });

    this.adminService.getRideStats().subscribe({
      next: value => this.rideStats = value,
      error: err => console.error('Failed to load ride stats', err)
    });
  }
}
