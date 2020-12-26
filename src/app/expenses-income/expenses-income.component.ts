import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { ExpensesIncome } from '../models/expenses-income.model';
import { ExpenseIncomeService } from '../services/expense-income.service';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-expenses-income',
  templateUrl: './expenses-income.component.html',
  styles: [
  ]
})
export class ExpensesIncomeComponent implements OnInit, OnDestroy {
  incomeForm: FormGroup;
  type: string = 'income';
  isLoading: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private incomeExpenseService: ExpenseIncomeService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  save(): void {
    if (this.incomeForm.invalid) return;
    this.store.dispatch(ui.isLoading());

    const { description, amount } = this.incomeForm.value;

    const expenseIncome = new ExpensesIncome(description, amount, this.type);

    this.incomeExpenseService.createExpenseIncome(expenseIncome)
      .then(() => {
        this.incomeForm.reset();
        Swal.fire('Registry created', description, 'success');
        this.store.dispatch(ui.stopLoading());
      })
      .catch(({ message }) => Swal.fire('Registry created', message, 'success'))
      .finally(() => this.store.dispatch(ui.stopLoading()));
  }
}
