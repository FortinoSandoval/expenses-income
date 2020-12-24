import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ExpensesIncome } from '../models/expenses-income.model';
import { ExpenseIncomeService } from '../services/expense-income.service';

@Component({
  selector: 'app-expenses-income',
  templateUrl: './expenses-income.component.html',
  styles: [
  ]
})
export class ExpensesIncomeComponent implements OnInit {
  incomeForm: FormGroup;
  type: string = 'income';

  constructor(private fb: FormBuilder, private incomeExpenseService: ExpenseIncomeService) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  save() {
    if (this.incomeForm.invalid) return;

    const { description, amount } = this.incomeForm.value;

    const expenseIncome = new ExpensesIncome(description, amount, this.type);

    this.incomeExpenseService.createExpenseIncome(expenseIncome).then(() => {
      this.incomeForm.reset();
      Swal.fire('Registry created', description, 'success');
    }).catch(({ message }) => Swal.fire('Registry created', message, 'success'));

  }
}
