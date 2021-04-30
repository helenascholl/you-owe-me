import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Debtor } from './debtor';
import { DebtType } from './debt';

@Injectable({
  providedIn: 'root'
})
export class DebtorService {

  private readonly debtors: Debtor[];
  private currentId: number;

  constructor() {
    this.debtors = [
      new Debtor(1, 'Test1', new Date(2021, 1, 3), [
        {
          amount: 3.50,
          type: DebtType.MONTHLY,
          since: new Date(2021, 1, 3)
        },
        {
          amount: 4,
          type: DebtType.DAILY,
          since: new Date(2020, 9, 28)
        }
      ]),
      new Debtor(2, 'Test2', new Date(2019, 10, 25), [
        {
          amount: 100,
          type: DebtType.YEARLY,
          since: new Date(2018, 3, 10)
        }
      ]),
      new Debtor(3, 'Test3', new Date(2020, 11, 20), [
        {
          amount: 20,
          type: DebtType.WEEKLY,
          since: new Date(2020, 6, 4)
        },
        {
          amount: 2.50,
          type: DebtType.MONTHLY,
          since: new Date(2018, 11, 18)
        }
      ])
    ];
    this.currentId = 1;
  }

  public getDebtors(): Observable<Debtor[]> {
    return of(this.debtors);
  }

  public getDebtor(id: number): Observable<Debtor> {
    const debtor = this.debtors.find(d => d.id === id) as Debtor;
    return of(debtor);
  }

  public addDebtor(name: string): Observable<Debtor> {
    const debtor = new Debtor(this.currentId++, name);
    this.debtors.push(debtor);

    return of(debtor);
  }

}
