import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ExpensesIncome } from 'src/app/models/expenses-income.model';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styles: [
  ]
})
export class StatsComponent implements OnInit {
  expenses: number = 0;
  income: number = 0;
  totalExpenses: number = 0;
  totalIncome: number = 0;

  public doughnutChartLabels: Label[] = ['Income', 'Expenses'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('expensesIncome').subscribe(({ items }) => {
      this.generateStats(items);
    });
  }

  generateStats(items: ExpensesIncome[]) {
    this.totalExpenses = this.totalIncome = this.expenses = this.income = 0;
    items.forEach(item => {
      if (item.type === 'income') {
        this.totalIncome += Number(item.amount);
        this.income++;
      } else {
        this.totalExpenses += Number(item.amount);
        this.expenses++;
      }
    })

    this.doughnutChartData = [[this.totalIncome, this.totalExpenses]];
  }

}
