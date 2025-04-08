import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';

export interface visitsApiResponse {
  timeframe: string;
  period: string;
  currentVisits: number;
  data: { day: string; visits: number; date: string }[];
}

export interface visitsData {
  days: string[];
  visits: number[];
  dates: string[];
}

@Injectable({
  providedIn: 'root',
})
export class VisitsReportService {
  private weeklyVisitsApiUrl = 'https://dummyjson.com/c/904c-ee46-4405-8069';
  private monthlyVisitsApiUrl = 'https://dummyjson.com/c/191f-bd45-4e77-9950';
  private yearlyVisitsApiUrl = 'https://dummyjson.com/c/ca79-30fb-40e8-b3af';

  constructor(private http: HttpClient) {}

  getWeeklyVisitsResponse(): Observable<visitsApiResponse> {
    return this.http
      .get<visitsApiResponse>(this.weeklyVisitsApiUrl)
      .pipe(catchError(this.handleError), shareReplay(1));
  }

  getMonthlyVisitsResponse(): Observable<visitsApiResponse> {
    return this.http
      .get<visitsApiResponse>(this.monthlyVisitsApiUrl)
      .pipe(catchError(this.handleError), shareReplay(1));
  }

  getYearlyVisitsResponse(): Observable<visitsApiResponse> {
    return this.http
      .get<visitsApiResponse>(this.yearlyVisitsApiUrl)
      .pipe(catchError(this.handleError), shareReplay(1));
  }

  getCurrentVisits(response: visitsApiResponse): visitsData {
    const dates = response.data.map((item) => item.date);

    const days = response.data.map((item) => item.day);
    const visits = response.data.map((item) => item.visits);
    return { days, dates, visits };
  }

  getResponseForPeriod(
    period: 'week' | 'month' | 'year'
  ): Observable<visitsApiResponse> {
    switch (period) {
      case 'week':
        return this.getWeeklyVisitsResponse();
      case 'month':
        return this.getMonthlyVisitsResponse();
      case 'year':
        return this.getYearlyVisitsResponse();
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong. Please try again later.');
  }
}
