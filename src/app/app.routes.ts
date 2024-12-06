import { Routes } from '@angular/router';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'stocks', pathMatch: 'full' },
  { path: 'stocks', component: StockListComponent },
  { path: 'add-stock', component: AddStockComponent },
];
