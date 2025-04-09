import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { product, ProductViewModel } from '../interfaces/products-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsResponseSubject = new BehaviorSubject<product[]>([]);
  products$ = this.productsResponseSubject.asObservable();

  private productsForDisplaySubject = new BehaviorSubject<ProductViewModel[]>(
    []
  );

  productsForDisplay$ = this.productsForDisplaySubject.asObservable();

  private productsUrl = 'https://fakestoreapi.com/products';

  private http = inject(HttpClient);

  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(this.productsUrl).pipe(
      tap((products) => {
        this.productsResponseSubject.next(products);
        const displayedProducts = this.getProductsForDisplay(products);
        this.productsForDisplaySubject.next(displayedProducts);
        console.log(products);
      }),
      catchError(this.handleError),
      shareReplay(1)
    );
  }

  private getProductsForDisplay(products: product[]): ProductViewModel[] {
    return products.map(
      ({ id, title, description, image, price, category }) => ({
        id,
        title,
        description,
        image,
        price,
        category,
      })
    );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong. Please try again later.');
  }
}
