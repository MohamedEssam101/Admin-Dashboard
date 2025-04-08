import { Component, inject } from '@angular/core';
import { RoutesService } from '../../services/routes.service';
import { RouteButtonComponent } from './route-button/route-button.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouteButtonComponent, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  routesService = inject(RoutesService);
  routes = this.routesService.routes;
  utilRoutes = this.routesService.utilRoutes;
}
