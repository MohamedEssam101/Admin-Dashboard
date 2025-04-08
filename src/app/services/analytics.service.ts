import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { analyticsResponse } from '../interfaces/analytics-interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private productSubject = new BehaviorSubject<analyticsResponse | null>(null);
  products$ = this.productSubject.asObservable();

  private baseUrl = 'https://dummyjson.com/c/c082-803a-4c23-b8e3';

  private http = inject(HttpClient);
  getAnalyticsData(): Observable<analyticsResponse> {
    return this.http.get<analyticsResponse>(this.baseUrl).pipe(
      tap((data) => {
        this.productSubject.next(data);
      }),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong. Please try again later.');
  }
}
