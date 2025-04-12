import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import {
  filteredSalesData,
  salesApiResponse,
} from '../interfaces/analytics-interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { parse } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private productSubject = new BehaviorSubject<salesApiResponse | null>(null);
  products$ = this.productSubject.asObservable();

  private filteredDataSubject = new BehaviorSubject<filteredSalesData | null>(
    null
  );
  filteredData$ = this.filteredDataSubject.asObservable();

  private dailyAnalyticsUrl = 'https://dummyjson.com/c/180e-19f3-41f8-b0df';

  private http = inject(HttpClient);
  getAnalyticsData(): Observable<salesApiResponse> {
    return this.http.get<salesApiResponse>(this.dailyAnalyticsUrl).pipe(
      tap((data) => {
        this.productSubject.next(data);
        this.initializeWithTodayData();
      }),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  getFilteredData(startDate: Date, endDate: Date): void {
    const apiResponse = this.productSubject.getValue();

    if (!apiResponse || !apiResponse.data) {
      this.filteredDataSubject.next({
        revenue: 0,
        itemsSold: 0,
        todayRevenue: 0,
        visits: 0, // Initialize visits to 0
      });
      return;
    }

    const salesData = apiResponse.data;

    // Format date to MM/DD/YYYY for comparison
    const formatDate = (date: Date): string => {
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2-digit month
      const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit day
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    // Convert startDate and endDate to strings
    const startStr = formatDate(startDate);
    const endStr = formatDate(endDate);

    // Filter data within the date range
    const filteredData = salesData.filter(
      (sale) => sale.date >= startStr && sale.date <= endStr
    );

    // Calculate totals
    const totalRevenue = filteredData.reduce(
      (acc, sale) => acc + sale.revenue,
      0
    );
    const totalItemsSold = filteredData.reduce(
      (acc, sale) => acc + sale.itemsSold,
      0
    );

    // Calculate total visits from filtered data
    const totalVisits = filteredData.reduce(
      (acc, sale) => acc + (sale.visits || 0), // Use 0 if visits is undefined in some records
      0
    );

    // Calculate today's revenue from all sales (not just the filtered ones)
    const todayStr = formatDate(new Date());
    const todayRevenue = salesData
      .filter((sale) => sale.date === todayStr)
      .reduce((acc, sale) => acc + sale.revenue, 0);

    console.log(todayRevenue);
    // Emit results including today's revenue and visits
    this.filteredDataSubject.next({
      revenue: totalRevenue,
      itemsSold: totalItemsSold,
      todayRevenue: todayRevenue, // Include the computed today's revenue
      visits: totalVisits, // Include the computed visits
    });

    console.log(this.filteredDataSubject.getValue());
  }

  DisplayChartData(dateRange: string) {
    const [startDateStr, endDateStr] = dateRange.split(' - ');

    const startDate = this.convertToDate(startDateStr);
    const endDate = this.convertToDate(endDateStr);
    this.getFilteredData(startDate, endDate);
  }
  private convertToDate(dateStr: string): Date {
    return parse(dateStr, 'MM/dd/yyyy', new Date());
  }

  initializeWithTodayData(): void {
    const today = new Date();
    const formattedToday = this.formatDate(today);
    const todayRange = `${formattedToday} - ${formattedToday}`;

    // Set default data
    this.DisplayChartData(todayRange);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong. Please try again later.');
  }
  private formatDate(date: Date): string {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
}
