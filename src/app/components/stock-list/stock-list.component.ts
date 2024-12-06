import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: any[] = [];
  portfolioValue: number = 0;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.getAllStocks();
    this.calculatePortfolioValue();
  }

  getAllStocks(): void {
    this.stockService.getAllStocks().subscribe(data => {
      this.stocks = data;
    });
  }

  deleteStock(id: number): void {
    this.stockService.deleteStock(id).subscribe(() => {
      this.getAllStocks();
      this.calculatePortfolioValue();
    });
  }

  calculatePortfolioValue(): void {
    this.stockService.getPortfolioValue().subscribe(data => {
      this.portfolioValue = data.totalValue;
    });
  }
}
