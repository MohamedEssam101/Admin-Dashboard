import { Component, inject, OnInit } from '@angular/core';
import { AnalyticsCardComponent } from './analytics-card/analytics-card.component';
import { AnalyticsReportComponent } from './analytics-report/analytics-report.component';
import { AnalyticsService } from '../../../services/analytics.service';
import { filteredSalesData } from '../../../interfaces/analytics-interface';
import { first, Observable, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AnalyticsVisitsComponent } from './analytics-visits/analytics-visits.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // For buttons like mat-button
import { MatMenuModule } from '@angular/material/menu'; // For dropdown menu functionality
import { FormsModule } from '@angular/forms';
import {
  ChangeEventArgs,
  DateRangePickerModule,
} from '@syncfusion/ej2-angular-calendars';

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
    FormsModule,
    DateRangePickerModule,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  protected analyticsData$!: Observable<filteredSalesData | null>;

  selectedRange = 'Today';
  // In your component
  ngOnInit() {
    this.analyticsService
      .getAnalyticsData()
      .pipe(
        first((data) => !!data),
        tap(() => this.analyticsService.initWithTodayData())
      )
      .subscribe();

    this.analyticsData$ = this.analyticsService.filteredData$;
  }

  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(
    new Date(
      new Date().setDate(new Date().getDate() - ((new Date().getDay() + 7) % 7))
    ).toDateString()
  );
  public weekEnd: Date = new Date(
    new Date(
      new Date().setDate(
        new Date(
          new Date().setDate(
            new Date().getDate() - ((new Date().getDay() + 7) % 7)
          )
        ).getDate() + 6
      )
    ).toDateString()
  );
  public monthStart: Date = new Date(
    new Date(new Date().setDate(1)).toDateString()
  );
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)
    ).toDateString()
  );
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(
    new Date(new Date().setDate(new Date().getDate() - 365)).toDateString()
  );
  public yearEnd: Date = this.today;

  onDateRangeChange(event: ChangeEventArgs): void {
    const dateRange = event.text; // "3/5/2025 - 4/11/2025"

    if (dateRange) {
      this.analyticsService.DisplayChartData(dateRange);
    } else {
      console.error('Date range is undefined');
    }
  }
}
