import { Component, inject, OnInit } from '@angular/core';
import { AnalyticsCardComponent } from './analytics-card/analytics-card.component';
import { AnalyticsReportComponent } from './analytics-report/analytics-report.component';
import { AnalyticsService } from '../../../services/analytics.service';
import { filteredSalesData } from '../../../interfaces/analytics-interface';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AnalyticsVisitsComponent } from './analytics-visits/analytics-visits.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // For buttons like mat-button
import { MatMenuModule } from '@angular/material/menu'; // For dropdown menu functionality

@Component({
  selector: 'app-dashboard-analytics',
  standalone: true,
  imports: [
    AsyncPipe,
    AnalyticsCardComponent,
    AnalyticsReportComponent,
    CommonModule,
    AnalyticsVisitsComponent,
    MatIconModule,
    MatButtonModule, // Make sure this is imported
    MatMenuModule, // Make sure this is imported
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  protected analyticsData$!: Observable<filteredSalesData | null>;

  selectedRange = 'Today';
  ngOnInit() {
    this.analyticsService.getAnalyticsData().subscribe();

    this.analyticsData$ = this.analyticsService.filteredData$;
  }

  selectReportRange(
    range: 'today' | 'yesterday' | 'last Week' | 'last Month'
  ): void {
    this.selectedRange = range;
    this.analyticsService.getFilteredData(range);
  }
}
