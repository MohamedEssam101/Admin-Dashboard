import { Component, inject, OnInit } from '@angular/core';
import { AnalyticsCardComponent } from './analytics-card/analytics-card.component';
import { AnalyticsReportComponent } from './analytics-report/analytics-report.component';
import { AnalyticsService } from '../../../services/analytics.service';
import { analyticsResponse } from '../../../interfaces/analytics-interface';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AnalyticsVisitsComponent } from './analytics-visits/analytics-visits.component';

@Component({
  selector: 'app-dashboard-analytics',
  standalone: true,
  imports: [
    AsyncPipe,
    AnalyticsCardComponent,
    AnalyticsReportComponent,
    CommonModule,
    AnalyticsVisitsComponent,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  protected analyticsData$!: Observable<analyticsResponse | null>;

  ngOnInit() {
    this.analyticsData$ = this.analyticsService.products$;

    this.analyticsService.getAnalyticsData().subscribe();
  }
}
