import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule
  ],

})
export class SearchComponent {
  searchTerm = '';

  onSearch() {
    console.log('Search term:', this.searchTerm);
    // Place your search logic here.
  }

}
