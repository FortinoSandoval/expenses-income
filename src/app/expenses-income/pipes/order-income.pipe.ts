import { Pipe, PipeTransform } from '@angular/core';
import { ExpensesIncome } from 'src/app/models/expenses-income.model';

@Pipe({
  name: 'orderIncome'
})
export class OrderIncomePipe implements PipeTransform {

  transform(items: ExpensesIncome[]): ExpensesIncome[] {
    return items.slice().sort((a) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    })
  }
}
