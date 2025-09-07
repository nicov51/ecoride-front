import {Component, inject, OnInit, signal} from '@angular/core';
import {EmployeesService} from "../../../../services/employees.service";
import {ModerationStats} from "../../../../core/models/employee.interface";
import {BaseChartDirective} from "ng2-charts";
import {Chart, ChartData, ChartOptions, registerables} from "chart.js";

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  private employeesService = inject(EmployeesService);

  constructor() {
    Chart.register(...registerables);
  }

  // DONNÉES CHIFFRES
  totalStats = {
    pending: 0,
    approved: 0,
    rejected: 0,
    problems: 0
  };

  // DONNÉES GRAPHIQUES
  moderationChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  reviewsChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  moderationChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Répartition des modérations' }
    }
  };

  reviewsChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Avis modérés par statut' }
    }
  };

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.employeesService.getStats().subscribe({
      next: (data) => {
        this.totalStats = data;
        this.updateCharts();
      },
      error: (error) => console.error('Erreur chargement stats:', error)
    });
  }

  private updateCharts() {
    // GRAPHIQUE EN CAMEMBERT
    this.moderationChartData = {
      labels: ['En attente', 'Approuvés', 'Rejetés', 'Signalements'],
      datasets: [{
        data: [
          this.totalStats.pending,
          this.totalStats.approved,
          this.totalStats.rejected,
          this.totalStats.problems
        ],
        backgroundColor: ['#ffc107', '#28a745', '#dc3545', '#fd7e14']
      }]
    };

    // GRAPHIQUE EN BARRES
    this.reviewsChartData = {
      labels: ['Approuvés', 'Rejetés', 'En attente'],
      datasets: [{
        label: 'Nombre d\'avis',
        data: [this.totalStats.approved, this.totalStats.rejected, this.totalStats.pending],
        backgroundColor: ['#28a745', '#dc3545', '#ffc107']
      }]
    };
  }

  refreshStats() {
    this.loadStats();
  }
}
