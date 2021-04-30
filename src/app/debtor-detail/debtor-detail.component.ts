import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DebtorService } from '../debtor.service';
import Debtor from '../debtor';
import { DebtType } from '../debt';

@Component({
  selector: 'app-debtor-detail',
  templateUrl: './debtor-detail.component.html',
  styleUrls: ['./debtor-detail.component.scss']
})
export class DebtorDetailComponent implements OnInit {

  public debtor?: Debtor;
  public date = new Date();

  constructor(
    private route: ActivatedRoute,
    private debtorService: DebtorService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.debtorService.getDebtor(id)
      .subscribe(debtor => this.debtor = debtor);
  }

  public getPayments(): Payment[] {
    const payments: Payment[] = [];

    if (this.debtor) {
      const now = new Date();

      for (const debt of this.debtor.debts) {
        let noOfPayments = 0;
        let noOfUnpaidPayments = 0;

        switch (debt.type) {
          case DebtType.DAILY:
            noOfPayments = (now.getTime() - debt.since.getTime()) / (1000 * 60 * 60 * 24);
            noOfUnpaidPayments = (now.getTime() - debt.lastPaid.getTime()) / (1000 * 60 * 60 * 24);
            break;

          case DebtType.WEEKLY:
            noOfPayments = (now.getTime() - debt.since.getTime()) / (1000 * 60 * 60 * 24 * 7);
            noOfUnpaidPayments = (now.getTime() - debt.lastPaid.getTime()) / (1000 * 60 * 60 * 24 * 7);
            break;

          case DebtType.MONTHLY:
            noOfPayments = (now.getFullYear() - debt.since.getFullYear()) * 12 - debt.since.getMonth() + now.getMonth();
            noOfUnpaidPayments = (now.getFullYear() - debt.lastPaid.getFullYear()) * 12 - debt.lastPaid.getMonth() + now.getMonth();
            break;

          case DebtType.YEARLY:
            noOfPayments = now.getFullYear() - debt.since.getFullYear();
            noOfUnpaidPayments = now.getFullYear() - debt.lastPaid.getFullYear();
            break;
        }

        for (let i = 0; i < noOfPayments; i++) {
          let paymentDate: Date;

          switch (debt.type) {
            case DebtType.DAILY:
              paymentDate = new Date(debt.since.getFullYear(), debt.since.getMonth(), debt.since.getDate() + i);
              break;

            case DebtType.WEEKLY:
              paymentDate = new Date(debt.since.getFullYear(), debt.since.getMonth(), debt.since.getDate() + i * 7);
              break;

            case DebtType.MONTHLY:
              paymentDate = new Date(debt.since.getFullYear(), debt.since.getMonth() + i, debt.since.getDate());
              break;

            case DebtType.YEARLY:
              paymentDate = new Date(debt.since.getFullYear() + i, debt.since.getMonth(), debt.since.getDate());
              break;
          }

          payments.push({
            date: paymentDate,
            paid: noOfPayments - noOfUnpaidPayments >= i,
            amount: debt.amount
          });
        }
      }
    }

    return payments.sort((p1, p2) => p2.date.getTime() - p1.date.getTime());
  }

}

interface Payment {

  date: Date;
  paid: boolean;
  amount: number;

}
