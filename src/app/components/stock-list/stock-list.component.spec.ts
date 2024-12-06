import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockListComponent } from './stock-list.component';
import { StockService } from '../../services/stock.service';
import { of } from 'rxjs';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let mockStockService: jasmine.SpyObj<StockService>;

  beforeEach(() => {
    // Create a mock StockService
    mockStockService = jasmine.createSpyObj('StockService', ['getAllStocks', 'deleteStock', 'getPortfolioValue']);

    TestBed.configureTestingModule({
      imports: [StockListComponent], // Add the standalone component to imports
      providers: [{ provide: StockService, useValue: mockStockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;

    // Mock data
    const mockStocks = [
      { id: 1, symbol: 'AAPL', quantity: 10, currentPrice: 150 },
      { id: 2, symbol: 'GOOGL', quantity: 5, currentPrice: 2800 },
    ];
    const mockPortfolioValue = { totalValue: 14500 };

    // Setup default mock behavior
    mockStockService.getAllStocks.and.returnValue(of(mockStocks));
    mockStockService.getPortfolioValue.and.returnValue(of(mockPortfolioValue));

    fixture.detectChanges(); // Trigger lifecycle methods
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all stocks on initialization', () => {
    expect(mockStockService.getAllStocks).toHaveBeenCalled();
    expect(component.stocks.length).toBe(2);
    expect(component.stocks[0].symbol).toBe('AAPL');
  });

  it('should calculate the portfolio value on initialization', () => {
    expect(mockStockService.getPortfolioValue).toHaveBeenCalled();
    expect(component.portfolioValue).toBe(14500);
  });

  it('should fetch stocks again after deleting a stock', () => {
    // Mock deleteStock
    mockStockService.deleteStock.and.returnValue(of({}));

    component.deleteStock(1);

    // Ensure the necessary methods were called
    expect(mockStockService.deleteStock).toHaveBeenCalledWith(1);
    expect(mockStockService.getAllStocks).toHaveBeenCalledTimes(2); // Once on init, once after delete
    expect(mockStockService.getPortfolioValue).toHaveBeenCalledTimes(2); // Once on init, once after delete
  });
});
