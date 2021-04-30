import { Debt, DebtType } from './debt';

export class Debtor {

  public id: number;
  public name: string;
  public lastPaid: Date;
  public debts: Debt[];

  constructor(id: number, name: string, lastPaid: Date = new Date(), debts: Debt[] = []) {
    this.id = id;
    this.name = name;
    this.lastPaid = lastPaid;
    this.debts = debts;
  }

  public getPayments(): Payment[] {
    const payments: Payment[] = [];
    const now = new Date();

    for (const debt of this.debts) {
      let noOfPayments = 0;
      let noOfUnpaidPayments = 0;

      switch (debt.type) {
        case DebtType.DAILY:
          noOfPayments = (now.getTime() - debt.since.getTime()) / (1000 * 60 * 60 * 24);
          noOfUnpaidPayments = (now.getTime() - this.lastPaid.getTime()) / (1000 * 60 * 60 * 24) - 1;
          break;

        case DebtType.WEEKLY:
          noOfPayments = (now.getTime() - debt.since.getTime()) / (1000 * 60 * 60 * 24 * 7);
          noOfUnpaidPayments = (now.getTime() - this.lastPaid.getTime()) / (1000 * 60 * 60 * 24 * 7);
          break;

        case DebtType.MONTHLY:
          noOfPayments = (now.getFullYear() - debt.since.getFullYear()) * 12 - debt.since.getMonth() + now.getMonth();
          noOfUnpaidPayments = (now.getFullYear() - this.lastPaid.getFullYear()) * 12 - this.lastPaid.getMonth() + now.getMonth();
          break;

        case DebtType.YEARLY:
          noOfPayments = now.getFullYear() - debt.since.getFullYear();
          noOfUnpaidPayments = now.getFullYear() - this.lastPaid.getFullYear();
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
          amount: debt.amount,
          debtType: debt.type
        });
      }
    }

    return payments.sort((p1, p2) => p2.date.getTime() - p1.date.getTime());
  }

  public getDebtSum(): number {
    return this.getPayments()
      .map(p => p.paid ? 0 : p.amount)
      .reduce((a, b) => a + b, 0);
  }

}

export interface Payment {

  date: Date;
  paid: boolean;
  amount: number;
  debtType: DebtType

}
