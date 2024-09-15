import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { SearchService } from '../services/search.service'; // Import the Search Service
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [FormsModule] 
})
export class DashboardComponent {

  query: string = ''; // Bind to the search input
  summary: string = ''; // To store the search result summary
  searchResults: string[] = []; // To store the list of search results

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router, private searchService: SearchService, private cdr: ChangeDetectorRef) {}

  // Navigation to benchmarking page
  navigateToBenchmarking(): void {
    this.router.navigate(['/benchmarking']);
  }

  // Method to call the backend and update the UI with search results
  onSearch(): void {
    if (this.query.trim()) {
      // Call the search service to get results
      this.searchService.search(this.query).subscribe(
        data => {
          this.searchResults = data.map((item: any) => item.title); // Adjust based on response format
          this.summary = this.searchResults.join(', '); // Join results into a string for summary
          this.cdr.detectChanges(); // Trigger change detection to update the UI
        },
        error => {
          console.error('Error occurred while fetching data:', error);
        }
      );
    }
  }

  // Focus the search input programmatically if needed
  focusSearchInput(): void {
    this.searchInput.nativeElement.focus();
  }

  // Handle Enter key press and trigger the search when the input is focused
  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent): void {
    if (this.searchInput.nativeElement === document.activeElement) {
      this.onSearch();
    }
  }
}