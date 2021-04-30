import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Debtor } from './debtor';
import { DebtType } from './debt';

@Injectable({
  providedIn: 'root'
})
export class DebtorService {

  private readonly debtors: Debtor[];

  constructor() {
    this.debtors = [
      new Debtor(1, 'Test1', [
        {
          amount: 3.50,
          type: DebtType.MONTHLY,
          since: new Date(2021, 1, 3),
          lastPaid: new Date(2021, 1, 3)
        },
        {
          amount: 4,
          type: DebtType.DAILY,
          since: new Date(2020, 9, 28),
          lastPaid: new Date(2021, 3, 24)
        }
      ]),
      new Debtor(2, 'Test2', [
        {
          amount: 100,
          type: DebtType.YEARLY,
          since: new Date(2018, 3, 10),
          lastPaid: new Date(2019, 10, 25)
        }
      ]),
      new Debtor(3, 'Test3', [
        {
          amount: 20,
          type: DebtType.WEEKLY,
          since: new Date(2020, 6, 4),
          lastPaid: new Date(2021, 2, 4)
        },
        {
          amount: 2.50,
          type: DebtType.MONTHLY,
          since: new Date(2018, 11, 18),
          lastPaid: new Date(2020, 11, 20)
        }
      ])
    ];
  }

  public getDebtors(): Observable<Debtor[]> {
    return of(this.debtors);
  }

  public getDebtor(id: number): Observable<Debtor> {
    const debtor = this.debtors.find(d => d.id === id) as Debtor;
    return of(debtor);
  }

}
