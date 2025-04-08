import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common'; // Optional, but often useful

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexFill,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { BehaviorSubject, map, Subject, switchMap, takeUntil } from 'rxjs';
import { VisitsReportService } from '../../../../services/visits-report.service';

export interface VisitsChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: ApexGrid;
}

@Component({
  selector: 'app-analytics-visits',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, AsyncPipe, NgClass],
  templateUrl: './analytics-visits.component.html',
  styleUrl: './analytics-visits.component.css',
})
export class AnalyticsVisitsComponent implements OnInit, OnDestroy {
  chartOptions!: VisitsChartOptions;

  private selectedPeriodSubject = new BehaviorSubject<
    'week' | 'month' | 'year'
  >('week');
  selectedPeriod$ = this.selectedPeriodSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(private visitsReportService: VisitsReportService) {}
  ngOnDestroy() {
    console.log('destroyed');
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.setupChartDataSubscription();
  }
  private updateChart(visits: number[], days: string[]): void {
    this.chartOptions = {
      series: [
        {
          name: 'Visits',
          data: visits, // Use visits parameter here
        },
      ],
      chart: {
        type: 'bar',
        height: 340,
        toolbar: {
          show: false,
        },
        offsetY: 0,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: days, // Use days parameter here
        labels: {
          show: true,
          style: {
            fontSize: '8px', // Adjust font size here
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        show: false,
      },
      fill: {
        colors: ['#4361EE'],
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val: number): string => `${val} visits`,
        },
        theme: 'light',
      },
      grid: {
        show: false,
      },
    };
  }

  private setupChartDataSubscription(): void {
    this.selectedPeriod$
      .pipe(
        switchMap((period) =>
          this.visitsReportService.getResponseForPeriod(period)
        ),
        map((apiResponse) => {
          const visitsData =
            this.visitsReportService.getCurrentVisits(apiResponse);
          return {
            dates: visitsData.dates,
            visits: visitsData.visits,
            days: visitsData.days,
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          this.updateChart(data.visits, data.days);
        },
        error: (error) => {
          console.error('Error fetching chart data:', error);
        },
      });
  }

  onPeriodChange(period: 'week' | 'month' | 'year'): void {
    this.selectedPeriodSubject.next(period);
  }
}
