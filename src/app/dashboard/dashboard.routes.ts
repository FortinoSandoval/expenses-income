import { Routes } from '@angular/router';
import { DetailComponent } from '../expenses-income/detail/detail.component';
import { ExpensesIncomeComponent } from '../expenses-income/expenses-income.component';
import { StatsComponent } from '../expenses-income/stats/stats.component';


export const DashboardRoutes: Routes = [
  { path: '', component: StatsComponent },
  { path: 'expenses-income', component: ExpensesIncomeComponent },
  { path: 'detail', component: DetailComponent }
];