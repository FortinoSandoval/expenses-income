import { createAction, props } from '@ngrx/store';
import { ExpensesIncome } from '../models/expenses-income.model';

export const setItems = createAction('[ExpensesIncome Component] Set Items', props<{ items: ExpensesIncome[] }>());
export const unsetItems = createAction('[ExpensesIncome Component] Unset Items');