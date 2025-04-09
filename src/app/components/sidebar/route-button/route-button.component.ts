import { Component, inject, Input } from '@angular/core';
import { IRoute, RoutesService } from '../../../services/routes.service';
import { map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-route-button',
  standalone: true,
  imports: [NgClass, RouterLinkActive, MatIcon, RouterLink],
  templateUrl: './route-button.component.html',
  styleUrl: './route-button.component.css',
})
export class RouteButtonComponent {
  routesService = inject(RoutesService);
  private router = inject(Router);
  @Input() route!: IRoute;
  @Input() isActive$ = this.routesService.activeRoute.pipe(
    map((src) => src === this.route.label)
  );
}
