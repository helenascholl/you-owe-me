import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Debtor from './debtor';

@Injectable({
  providedIn: 'root'
})
export class DebtorService {

  private readonly debtors: Debtor[];

  constructor() {
    this.debtors = [
      { id: 1, name: 'Test1', debts: [] },
      { id: 2, name: 'Test2', debts: [] },
      { id: 3, name: 'Test3', debts: [] }
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
