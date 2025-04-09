import { Component, inject } from '@angular/core';
import { RoutesService } from '../../services/routes.service';
import { RouteButtonComponent } from './route-button/route-button.component';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/user-service';
import { Observable } from 'rxjs';
import { UserData } from '../../interfaces/user-interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouteButtonComponent, MatIcon, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private routesService = inject(RoutesService);
  private userService = inject(UserService);

  protected userData$: Observable<UserData>;

  constructor() {
    this.userData$ = this.userService.users$;
  }

  routes = this.routesService.routes;
  utilRoutes = this.routesService.utilRoutes;
}
