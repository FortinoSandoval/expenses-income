import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ExpensesIncomeComponent } from './expenses-income.component';
import { StatsComponent } from './stats/stats.component';
import { DetailComponent } from './detail/detail.component';

import { OrderIncomePipe } from './pipes/order-income.pipe';
import { ChartsModule } from 'ng2-charts';
import { expensesIncomeReducer } from './expenses-income.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    ExpensesIncomeComponent,
    StatsComponent,
    DetailComponent,
    OrderIncomePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature('expensesIncome', expensesIncomeReducer)
  ]
})
export class ExpensesIncomeModule { }
