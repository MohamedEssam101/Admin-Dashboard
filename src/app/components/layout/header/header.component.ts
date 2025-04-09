import { Component } from '@angular/core';
import { NotificationsComponent } from './notifications/notifications.component';
import { HeaderCartComponent } from './header-cart/header-cart.component';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NotificationsComponent,
    HeaderCartComponent,
    SearchComponent,
    UserProfileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
