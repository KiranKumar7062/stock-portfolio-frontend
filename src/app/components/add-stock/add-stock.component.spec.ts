import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddStockComponent } from './add-stock.component';
import { StockService } from '../../services/stock.service';
import { of, throwError } from 'rxjs';

describe('AddStockComponent', () => {
  let component: AddStockComponent;
  let fixture: ComponentFixture<AddStockComponent>;
  let mockStockService: jasmine.SpyObj<StockService>;

  beforeEach(() => {
    // Create a mock StockService
    mockStockService = jasmine.createSpyObj('StockService', ['addStock']);

    TestBed.configureTestingModule({
      imports: [AddStockComponent], // Add the standalone component here
      providers: [{ provide: StockService, useValue: mockStockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message when adding an invalid stock', () => {
    // Simulate the StockService returning a 4xx error
    mockStockService.addStock.and.returnValue(
      throwError({ status: 400, message: 'Invalid stock' })
    );

    component.addStock();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Please enter a valid stock.');
  });

  it('should reset the form and clear the error message after a successful add', () => {
    // Simulate a successful stock addition
    mockStockService.addStock.and.returnValue(of({}));

    component.addStock();
    fixture.detectChanges();

    expect(component.stock.symbol).toBe('');
    expect(component.stock.quantity).toBe(0);
    expect(component.errorMessage).toBe('');
  });
});
