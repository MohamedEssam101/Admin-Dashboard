import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { AsyncPipe } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductViewModel } from '../../../interfaces/products-interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, ProductDetailsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private productService = inject(ProductsService);
  productsForDisplay$ = this.productService.productsForDisplay$;

  selectedProductId: number | null = null;

  showProductDetails(product: ProductViewModel) {
    if (this.selectedProductId === product.id) {
      this.selectedProductId = null;
    } else {
      this.selectedProductId = product.id;
    }
  }
  constructor() {
    this.productService.getProducts().subscribe();
  }
}
