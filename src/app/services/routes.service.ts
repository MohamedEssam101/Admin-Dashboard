import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface IRoute {
  label: string;
  href: string;
  icon: string;
}
@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  activeRoute = new BehaviorSubject<string>('dashboard');
  routes: IRoute[] = [
    { href: '/dashboard', label: 'dashboard', icon: 'house' },
    {
      href: '/orders',
      label: 'orders',
      icon: 'shopping_cart',
    },
    { href: '/products', label: 'products', icon: 'other_houses' },
    { href: '/', label: 'transaction', icon: 'receipt' },
    { href: '/', label: 'reports', icon: 'receipt_long' },
  ];
  utilRoutes: IRoute[] = [
    { href: '/', label: 'messages', icon: 'message' },
    { href: '/', label: 'support', icon: 'contact_support' },
    { href: '/', label: 'settings', icon: 'settings' },
  ];
}
