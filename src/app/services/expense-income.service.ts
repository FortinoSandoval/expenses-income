import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ExpensesIncome } from '../models/expenses-income.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseIncomeService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  createExpenseIncome(expenseIncome: ExpensesIncome) {
    const uid = this.authService.user.uid;

    const item = {
      description: expenseIncome.description,
      type: expenseIncome.type,
      amount: expenseIncome.amount
    };

    return this.firestore
      .doc(`${uid}/expenses-income`)
      .collection('items')
      .add(item);
  }

  initExpensesIncomeListener(uid: string) {
    return this.firestore
      .collection(`${uid}/expenses-income/items`)
      .snapshotChanges()
      .pipe(
        map(snapshots => snapshots.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })))
      );
  }

  deleteExpenseIncome(uidItem: string) {
    const uid = this.authService.user.uid;
    
    return this.firestore.doc(`${uid}/expenses-income/items/${uidItem}`).delete();
  }
}
