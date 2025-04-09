import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../../services/user-service';
import { UserData } from '../../../../interfaces/user-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatIcon, AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  private userService = inject(UserService);

  protected userData$: Observable<UserData>;

  constructor() {
    this.userData$ = this.userService.users$;
  }
}
