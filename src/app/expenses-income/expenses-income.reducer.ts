import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ExpensesIncome } from '../models/expenses-income.model';
import * as actions from './expenses-income.actions';

export interface State {
  items: ExpensesIncome[]
}

export interface AppStateWithExpensesIncome extends AppState {
  expensesIncome: State
}

export const initialState: State = {
  items: []
}

const _expensesIncomeReducer = createReducer(initialState,
  on(actions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(actions.unsetItems, state => ({ ...state, items: [] }))
);

export function expensesIncomeReducer(state, action) {
  return _expensesIncomeReducer(state, action);
}