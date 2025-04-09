import { Routes } from '@angular/router';
import { DashboardPageComponent } from './containers/dashboard/page/page.component';
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
  {
    path: 'products',
    loadComponent: () =>
      import('./containers/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
];
