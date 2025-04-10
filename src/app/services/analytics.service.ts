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
  SalesData,
} from '../interfaces/analytics-interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

  private dailyAnalyticsUrl = 'https://dummyjson.com/c/236a-a15e-4c64-b274';

  private http = inject(HttpClient);
  getAnalyticsData(): Observable<salesApiResponse> {
    return this.http.get<salesApiResponse>(this.dailyAnalyticsUrl).pipe(
      tap((data) => {
        console.log(data);
        this.productSubject.next(data);
        this.getFilteredData('today');
      }),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  getFilteredData(
    range: 'today' | 'yesterday' | 'last Week' | 'last Month'
  ): void {
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
    const now = new Date();
    let filteredData: SalesData[] = [];

    // Format date to YYYY-MM-DD
    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };

    // Today's date string
    const todayStr = formatDate(now);

    // Filter data based on range
    switch (range) {
      case 'today':
        // Simple equality check for today
        filteredData = salesData.filter((sale) => sale.date === todayStr);
        break;

      case 'yesterday': // Get yesterday and filter
      {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = formatDate(yesterday);
        filteredData = salesData.filter((sale) => sale.date === yesterdayStr);
        break;
      }

      case 'last Week': {
        const lastWeek = new Date(now);
        lastWeek.setDate(lastWeek.getDate() - 7);
        const weekAgoStr = formatDate(lastWeek);
        const yesterdayForWeek = new Date(now);
        yesterdayForWeek.setDate(yesterdayForWeek.getDate() - 1);
        const yesterdayStrForWeek = formatDate(yesterdayForWeek);
        filteredData = salesData.filter(
          (sale) => sale.date >= weekAgoStr && sale.date <= yesterdayStrForWeek
        );
        break;
      }

      case 'last Month': {
        const lastMonth = new Date(now);
        lastMonth.setDate(lastMonth.getDate() - 30); // 30 days ago
        const monthAgoStr = formatDate(lastMonth);
        const yesterdayForMonth = new Date(now);
        yesterdayForMonth.setDate(yesterdayForMonth.getDate() - 1);
        const yesterdayStrForMonth = formatDate(yesterdayForMonth);
        filteredData = salesData.filter(
          (sale) =>
            sale.date >= monthAgoStr && sale.date <= yesterdayStrForMonth
        );
        break;
      }
    }

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
    const todayRevenue = salesData
      .filter((sale) => sale.date === todayStr)
      .reduce((acc, sale) => acc + sale.revenue, 0);

    // Emit results including today's revenue and visits
    this.filteredDataSubject.next({
      revenue: totalRevenue,
      itemsSold: totalItemsSold,
      todayRevenue, // Include the computed today's revenue
      visits: totalVisits, // Include the computed visits
    });
    console.log(this.filteredDataSubject.getValue());
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong. Please try again later.');
  }
}
