import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Debtor } from './debtor';
import { Debt, DebtType } from './debt';

@Injectable({
  providedIn: 'root'
})
export class DebtorService {

  private readonly debtors: Debtor[];
  private currentDebtorId: number;
  private currentDebtId: number;

  constructor() {
    this.debtors = [
      new Debtor(1, 'Test1', new Date(2021, 1, 3), [
        {
          id: 1,
          amount: 3.50,
          type: DebtType.MONTHLY,
          since: new Date(2021, 1, 3)
        },
        {
          id: 2,
          amount: 4,
          type: DebtType.DAILY,
          since: new Date(2020, 9, 28)
        }
      ]),
      new Debtor(2, 'Test2', new Date(2019, 10, 25), [
        {
          id: 3,
          amount: 100,
          type: DebtType.YEARLY,
          since: new Date(2018, 3, 10)
        }
      ]),
      new Debtor(3, 'Test3', new Date(2020, 11, 20), [
        {
          id: 4,
          amount: 20,
          type: DebtType.WEEKLY,
          since: new Date(2020, 6, 4)
        },
        {
          id: 5,
          amount: 2.50,
          type: DebtType.MONTHLY,
          since: new Date(2018, 11, 18)
        }
      ])
    ];
    this.currentDebtorId = 1;
    this.currentDebtId = 1;
  }

  public getDebtors(): Observable<Debtor[]> {
    return of(this.debtors);
  }

  public getDebtor(id: number): Observable<Debtor | null> {
    const debtor = this.debtors.find(d => d.id === id) ?? null;
    return of(debtor);
  }

  public addDebtor(name: string): Observable<Debtor> {
    const debtor = new Debtor(this.currentDebtorId++, name);
    this.debtors.push(debtor);

    return of(debtor);
  }

  public removeDebtor(id: number): Observable<Debtor | null> {
    for (const debtor of this.debtors) {
      if (debtor.id === id) {
        this.debtors.splice(this.debtors.indexOf(debtor), 1);
        return of(debtor);
      }
    }

    return of(null);
  }

  public addDebt(debtorId: number, amount: number, type: DebtType, since: Date): Observable<Debt | null> {
    const debtor = this.debtors.find(d => d.id === debtorId) ?? null;

    if (debtor) {
      const debt = {
        id: this.currentDebtId++,
        amount: amount,
        type: type,
        since: since
      };
      debtor.debts.push(debt);

      return of(debt);
    }

    return of(null);
  }

  public removeDebt(debtId: number): Observable<Debt | null> {
    for (const debtor of this.debtors) {
      for (const debt of debtor.debts) {
        if (debt.id === debtId) {
          debtor.debts.splice(debtor.debts.indexOf(debt), 1);
          return of(debt);
        }
      }
    }

    return of(null);
  }

}
