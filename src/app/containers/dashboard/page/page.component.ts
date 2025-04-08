import { Component } from '@angular/core';
import { AnalyticsComponent } from "../analytics/analytics.component";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [AnalyticsComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class DashboardPageComponent {

}
