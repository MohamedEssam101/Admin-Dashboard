import { Component, inject, Input } from '@angular/core';
import { IRoute, RoutesService } from '../../../services/routes.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-route-button',
  standalone: true,
  imports: [NgClass, AsyncPipe, MatIcon],
  templateUrl: './route-button.component.html',
  styleUrl: './route-button.component.css',
})
export class RouteButtonComponent {
  routesService = inject(RoutesService);
  @Input() route!: IRoute;
  @Input() isActive$ = this.routesService.activeRoute.pipe(
    map((src) => src === this.route.label)
  );

  onClick() {
    this.routesService.setIsActive(this.route.label);
  }
}
