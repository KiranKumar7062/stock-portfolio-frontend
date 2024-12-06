import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;
  let httpMock: HttpTestingController;

  const mockStocks = [
    { id: 1, symbol: 'AAPL', quantity: 10, currentPrice: 150 },
    { id: 2, symbol: 'GOOGL', quantity: 5, currentPrice: 2800 },
  ];

  const mockPortfolioValue = { totalValue: 14500 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockService],
    });

    service = TestBed.inject(StockService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched HTTP requests are outstanding
    httpMock.verify();
  });

  it('should fetch all stocks', () => {
    service.getAllStocks().subscribe((stocks) => {
      expect(stocks.length).toBe(2);
      expect(stocks).toEqual(mockStocks);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/stocks');
    expect(req.request.method).toBe('GET');
    req.flush(mockStocks); // Mock the response
  });

  it('should add a stock', () => {
    const newStock = { symbol: 'MSFT', quantity: 15 };

    service.addStock(newStock).subscribe((response) => {
      expect(response).toEqual(newStock);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/stocks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newStock);
    req.flush(newStock); // Mock the response
  });

  it('should delete a stock', () => {
    const stockId = 1;

    service.deleteStock(stockId).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/stocks/${stockId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Mock the response
  });

  it('should fetch the portfolio value', () => {
    service.getPortfolioValue().subscribe((value) => {
      expect(value).toEqual(mockPortfolioValue);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/stocks/value');
    expect(req.request.method).toBe('GET');
    req.flush(mockPortfolioValue); // Mock the response
  });
});
