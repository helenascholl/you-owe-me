export enum DebtType {
  DAILY,
  WEEKLY,
  MONTHLY,
  YEARLY
}

export interface Debt {

  amount: number;
  type: DebtType;

}
