import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, throwError, catchError } from 'rxjs';
interface salesApiResponse {
  timeframe: string;
  period: string;
  currentValue: number;
  data: { date: string; day: string; value: number }[];
  comparison: {
    previousPeriod: { value: number; change: number; trend: string };
    previousYear: { value: number; change: number; trend: string };
  };
}

@Injectable({
  providedIn: 'root',
})
export class SalesReportService {
  private weeklyApiUrl = 'https://dummyjson.com/c/36f1-d213-4096-9b0f';

  private monthlyApiUrl = 'https://dummyjson.com/c/ada8-417b-4528-9a2a';
  private yearlyApiUrl = 'https://dummyjson.com/c/f914-e2f8-4420-b6b6';

  constructor(private http: HttpClient) {}

  getWeeklyResponse(): Observable<salesApiResponse> {
    return this.http
      .get<salesApiResponse>(this.weeklyApiUrl)
      .pipe(catchError(this.handleError), shareReplay(1));
  }

  getMonthlyResponse(): Observable<salesApiResponse> {
    return this.http
      .get<salesApiResponse>(this.monthlyApiUrl)
      .pipe(catchError(this.handleError), shareReplay(1));
  }

  getYearlyResponse(): Observable<salesApiResponse> {
    return this.http
      .get<salesApiResponse>(this.yearlyApiUrl)
      .pipe(catchError(this.handleError), shareReplay(1));
  }

  getCurrentValues(currentApiResponse: salesApiResponse) {
    const dates = currentApiResponse.data.map((item) => item.date);
    const days = currentApiResponse.data.map((item) => item.day);
    const values = currentApiResponse.data.map((item) => item.value);

    return { dates, days, values };
  }

  getResponseForPeriod(
    period: 'week' | 'month' | 'year'
  ): Observable<salesApiResponse> {
    switch (period) {
      case 'week':
        return this.getWeeklyResponse();
      case 'month':
        return this.getMonthlyResponse();
      case 'year':
        return this.getYearlyResponse();
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong. Please try again later.');
  }
}
