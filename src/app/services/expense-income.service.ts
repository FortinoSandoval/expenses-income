import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ExpensesIncome } from '../models/expenses-income.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseIncomeService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  createExpenseIncome(expenseIncome: ExpensesIncome) {
    const uid = this.authService.user.uid;

    return this.firestore
      .doc(`${uid}/expenses-income`)
      .collection('items')
      .add({ ...expenseIncome });
  }
}
