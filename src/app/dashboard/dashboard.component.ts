import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../expenses-income/expenses-income.actions';
import { ExpenseIncomeService } from '../services/expense-income.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  expensesIncomeSubscription: Subscription;

  constructor(private store: Store<AppState>, private expenseIncome: ExpenseIncomeService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user').pipe(
      filter(auth => auth.user != null)
    ).subscribe(({ user }) => {
      this.expensesIncomeSubscription = this.expenseIncome.initExpensesIncomeListener(user.uid).subscribe(expensesIncome => {
        this.store.dispatch(setItems({ items: expensesIncome }))
      });
    });
  }

  ngOnDestroy(): void {
    this.expensesIncomeSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
