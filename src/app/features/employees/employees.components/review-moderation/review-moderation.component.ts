import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {EmployeesService} from "../../../../services/employees.service";
import {DashboardStats} from "../../../../core/models/employee.interface";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-review-moderation',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './review-moderation.component.html',
  styleUrl: './review-moderation.component.css'
})
export class ReviewModerationComponent implements OnInit {
  private employeesService = inject(EmployeesService);

  today = new Date();

  stats = signal<DashboardStats>({
    pendingReviews: 0,
    problemRides: 0,
    totalModerated: 0,
    todayActions: 0
  })

  loading = signal(false);
  currentTime = signal(new Date());

  ngOnInit() {
    this.loadStats();
  }

  private loadStats() {
    this.loading.set(true);
    this.employeesService.getProblemRides().subscribe({
      next: (rides) => {
        this.stats.update(current => ({
          ...current,
          problemRides: rides.length
        }));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    })

  }
}
