export enum DebtType {
  DAILY,
  WEEKLY,
  MONTHLY,
  YEARLY
}

export class Debt {

  public amount: number;
  public type: DebtType;

  constructor(amount: number, type: DebtType) {
    this.amount = amount;
    this.type = type;
  }

}
