import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-add-stock',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent {
  stock = { symbol: '', quantity: 0 };
  errorMessage: string = ''; // To display the error message

  constructor(private stockService: StockService) {}

  addStock(): void {
    this.errorMessage = ''; // Reset error message
    this.stockService.addStock(this.stock).subscribe({
      next: () => {
        alert('Stock added successfully!');
        this.stock = { symbol: '', quantity: 0 };
      },
      error: (err) => {
        // Handle 4xx errors
        if (err.status >= 400 && err.status < 500) {
          this.errorMessage = 'Please enter a valid stock.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }
}
