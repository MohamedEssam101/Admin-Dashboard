import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-analytics-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgIf],
  templateUrl: './analytics-card.component.html',
  styleUrl: './analytics-card.component.css',
})
export class AnalyticsCardComponent {
  @Input() label = 'label';
  @Input() value = 0;
  @Input() icon = '';
  @Input() hasDollarSign = false;
}
