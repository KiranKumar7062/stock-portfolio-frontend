import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/stocks';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  getAllStocks(): Observable<any> {
    return this.http.get(BASE_URL);
  }

  addStock(stock: any): Observable<any> {
    return this.http.post(BASE_URL, stock);
  }

  deleteStock(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

  getPortfolioValue(): Observable<any> {
    return this.http.get(`${BASE_URL}/value`);
  }
}
