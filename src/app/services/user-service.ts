import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { UserData } from '../interfaces/user-interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersResponseSubject = new BehaviorSubject<UserData>({} as UserData);
  users$ = this.usersResponseSubject.asObservable();

  private usersUrl = 'https://dummyjson.com/users';
  private http = inject(HttpClient);

  constructor() {
    this.getUser(1).subscribe();
  }

  getUser(id: number): Observable<UserData> {
    return this.http.get<UserData>(`${this.usersUrl}/${id}`).pipe(
      tap((user) => {
        this.usersResponseSubject.next(user);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong. Please try again later.');
  }
}
