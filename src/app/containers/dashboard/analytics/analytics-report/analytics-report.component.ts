import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { SalesReportService } from '../../../../services/sales-report.service';
import { BehaviorSubject, map, Subject, switchMap, takeUntil } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  annotations: ApexAnnotations;
  dataLabels: ApexDataLabels;
}

@Component({
  selector: 'app-analytics-report',
  standalone: true,
  imports: [NgApexchartsModule, NgIf, NgClass, AsyncPipe, MatIcon],
  templateUrl: './analytics-report.component.html',
  styleUrl: './analytics-report.component.css',
})
export class AnalyticsReportComponent implements OnInit, OnDestroy {
  chartOptions: {
    chart: ApexChart;
    series: ApexAxisChartSeries;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    fill: ApexFill;
    dataLabels: ApexDataLabels;
    tooltip: ApexTooltip;
    markers: ApexMarkers;
    grid: ApexGrid;
    yaxis: ApexYAxis | ApexYAxis[];
  } | null = null;

  private selectedPeriodSubject = new BehaviorSubject<
    'week' | 'month' | 'year'
  >('week');
  selectedPeriod$ = this.selectedPeriodSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(private salesReportService: SalesReportService) {}

  ngOnInit() {
    this.setupChartDataSubscription();
  }

  ngOnDestroy() {
    console.log('destroyed');
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChart(values: number[], days: string[], dates: string[]): void {
    this.chartOptions = {
      series: [
        {
          name: 'Sales',
          data: values,
        },
      ],
      chart: {
        type: 'area',
        height: 300,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
        colors: ['#007bff'],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 100],
        },
        colors: ['#007bff'],
      },
      markers: {
        size: 5,
        colors: ['#007bff'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      xaxis: {
        categories: days,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: '#6c757d',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        min: 0,
        max: values[2] + 150000,
        tickAmount: 5,
        labels: {
          style: {
            colors: '#6c757d',
            fontSize: '12px',
          },
          formatter: (value) => (value === 0 ? '$0' : '$' + value / 1000 + 'k'),
        },
      },
      grid: {
        show: true,
        borderColor: '#e7e7e7',
        strokeDashArray: 5,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        padding: {
          top: 5,
          right: 20,
          bottom: 0,
          left: 10,
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (value) => '$' + value.toLocaleString(),
        },
        marker: { show: true },
        x: {
          formatter: (value, opts) => {
            const index = opts.dataPointIndex;
            const day = days[index];
            const date = dates[index];
            return `${day} - ${date}`;
          },
        },
      },
    };
  }
  private setupChartDataSubscription(): void {
    this.selectedPeriod$
      .pipe(
        //distinctUntilChanged(), // Prevent unnecessary API calls for the same period
        switchMap((period) =>
          this.salesReportService.getResponseForPeriod(period)
        ),
        map((apiResponse) => {
          const salesData =
            this.salesReportService.getCurrentValues(apiResponse);
          return {
            dates: salesData.dates,
            values: salesData.values,
            days: salesData.days,
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          this.updateChart(data.values, data.days, data.dates);
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
