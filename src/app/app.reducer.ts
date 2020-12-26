import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as expensesIncome from './expenses-income/expenses-income.reducer'

export interface AppState {
  ui: ui.State,
  user: auth.State,
  // expensesIncome: expensesIncome.State
}


export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  // expensesIncome: expensesIncome.expensesIncomeReducer
}