import {Component, inject, OnInit} from '@angular/core';
import {Chart, ChartData, ChartOptions, registerables} from "chart.js";
import {AdminService} from "../../../../services/admin.service";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-admin-charts',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './admin-charts.component.html',
  styleUrl: './admin-charts.component.css'
})


// Chart.js = biblio js pour dessiner les graphiques dans un <canvas>
//ng2-charts = wrapper angular qui fournit la directive baseChart
export class AdminChartsComponent implements OnInit {

  // on initialise Chart.js
  constructor() {
    Chart.register(...registerables);
  }

  private adminService = inject(AdminService);
  rideChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  creditChartData: ChartData<'line'> = { labels: [], datasets: [] };

  // baseChart = directive fournie par ng2-charts. Elle prend les inputs suivants :
  // [data] → données du graphique (labels + datasets).
  // [options] → configuration visuelle (légende, responsive, etc.).
  // chartType="bar" → type de graphique (bar, line, pie, etc.).

  rideChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
  };

  creditChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
  };

  ngOnInit(): void {
    this.loadRideStats();
    this.loadCreditStats();
  }

  private loadRideStats(): void {
    this.adminService.getRideStats().subscribe(data => {
      const labels = data.map(item => item.date);
      const counts = data.map(item => Number(item.count));

      this.rideChartData = {
        labels,
        datasets: [
          { label: 'Nombre de courses', data: counts, backgroundColor: '#42A5F5' }
        ]
      };
    });
  }

  private loadCreditStats(): void {
    this.adminService.getCreditStats().subscribe(data => {
      const labels = data.map(item => item.date);
      const totals = data.map(item => Number(item.total));

      this.creditChartData = {
        labels,
        datasets: [
          { label: 'Crédits', data: totals, borderColor: '#66BB6A', fill: false, tension: 0.3 }
        ]
      };
    });
  }

}
