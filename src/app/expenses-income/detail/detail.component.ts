import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ExpensesIncome } from 'src/app/models/expenses-income.model';
import { ExpenseIncomeService } from 'src/app/services/expense-income.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {
  expensesIncome: ExpensesIncome[] = [];
  expensesIncomeSubscription: Subscription;

  constructor(private store: Store<AppState>, private expenseIncome: ExpenseIncomeService) { }

  ngOnInit(): void {
    this.expensesIncomeSubscription = this.store.select('expensesIncome').subscribe(({ items }) => this.expensesIncome = items);
  }

  ngOnDestroy(): void {
    this.expensesIncomeSubscription.unsubscribe();
  }

  delete(uid: string) {
    this.expenseIncome.deleteExpenseIncome(uid).then(() => {
      Swal.fire('Deleted', 'Item deleted', 'success');
    }).catch(({ message }) => {
      Swal.fire('Deleted', message, 'error');
    });
  }
}
