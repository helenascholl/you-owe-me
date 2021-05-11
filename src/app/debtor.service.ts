import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Debtor } from './debtor';
import { Debt, DebtType } from './debt';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebtorService {

  private readonly debtors: Subject<Debtor[]>;
  private currentDebtorId: number;
  private currentDebtId: number;
  private debtorSubscription: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private fireAuth: AngularFireAuth
  ) {
    this.debtorSubscription = new Subscription();
    this.currentDebtorId = 1;
    this.currentDebtId = 1;
    this.debtors = new Subject<Debtor[]>();
  }

  public getDebtors(): Observable<Debtor[]> {
    const debtors = new Subject<Debtor[]>();

    this.fireAuth.user
      .subscribe(user => {
        if (user) {
          this.db.list<Debtor>(`users/${user.uid}/debtors`)
            .valueChanges()
            .pipe(
              map(debtors => debtors.map(this.parseDebtor))
            )
            .subscribe(d => debtors.next(d));
        }
      });

    return debtors;
  }

  public getDebtor(id: number): Observable<Debtor | null> {
    const debtor = new Subject<Debtor | null>();

    this.fireAuth.user
      .subscribe(user => {
        if (user) {
          this.db.list<Debtor>(`users/${user.uid}/debtors`)
            .valueChanges()
            .pipe(
              map(debtors => debtors.map(this.parseDebtor)),
              map(debtors => debtors.filter(debtor => debtor.id === id)[0])
            )
            .subscribe(d => debtor.next(d));
        }
      });

    return debtor;
  }

  public addDebtor(name: string): void {
    this.fireAuth.user
      .subscribe(user => {
        if (user) {
          const subscription = this.db.list<Debtor>(`users/${user.uid}/debtors`)
            .valueChanges()
            .subscribe(debtors => {
              let maxId = 0;

              for (const debtor of debtors) {
                if (debtor.id > maxId) {
                  maxId = debtor.id;
                }
              }

              this.db.list<Debtor>(`users/${user.uid}/debtors`)
                .push(new Debtor(maxId + 1, name));

              subscription.unsubscribe();
            });
        }
      });
  }

  public removeDebtor(id: number): void {
    this.fireAuth.user
      .subscribe(user => {
        if (user) {
          const subscription = this.db.list<Debtor>(`users/${user.uid}/debtors`)
            .snapshotChanges()
            .subscribe(debtors => {
              for (const debtor of debtors) {
                if (debtor.payload.val()?.id === id) {
                  this.db.list<Debtor>(`users/${user.uid}/debtors`)
                    .remove(debtor.key ?? undefined);
                }
              }

              subscription.unsubscribe();
            });
        }
      });
  }

  public addDebt(debtorId: number, amount: number, type: DebtType, since: Date): void {
    this.fireAuth.user
      .subscribe(user => {
        if (user) {
          const list = this.db.list<Debtor>(`users/${user.uid}/debtors`);

          const subscription = list
            .snapshotChanges()
            .subscribe(debtors => {
              for (const debtorSnapshot of debtors) {
                const debtor = debtorSnapshot.payload.val();

                if (debtorSnapshot.key && debtor && debtor.id === debtorId) {
                  const debts: Debt[] = debtor.debts ?? [];

                  debts.push({
                    id: debts.length > 0 ? debtor.debts[debts.length - 1].id + 1 : 1,
                    amount: amount,
                    type: type,
                    since: since
                  });

                  list.update(debtorSnapshot.key, { debts: debts });
                }
              }

              subscription.unsubscribe();
            });
        }
      });
  }

  public removeDebt(debtorId: number, debtId: number): void {
    this.fireAuth.user
      .subscribe(user => {
        if (user) {
          const list = this.db.list<Debtor>(`users/${user.uid}/debtors`);

          const subscription = list
            .snapshotChanges()
            .subscribe(debtors => {
              for (const debtorSnapshot of debtors) {
                const debtor = debtorSnapshot.payload.val();

                if (debtorSnapshot.key && debtor && debtor.id === debtorId) {
                  for (const debt of debtor.debts) {
                    if (debt.id === debtId) {
                      debtor.debts.splice(debtor.debts.indexOf(debt), 1);
                    }
                  }

                  list.update(debtorSnapshot.key, { debts: debtor.debts });
                }
              }

              subscription.unsubscribe();
            });
        }
      });
  }

  private parseDebtor(debtor: Debtor): Debtor {
    return new Debtor(debtor.id, debtor.name, new Date(debtor.lastPaid), debtor.debts
      ? debtor.debts.map(debt => {
        return {
          id: debt.id,
          amount: debt.amount,
          type: debt.type,
          since: new Date(debt.since)
        };
      })
      : undefined
    );
  }
}
