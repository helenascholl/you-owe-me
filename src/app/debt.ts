export enum DebtType {
  DAILY,
  WEEKLY,
  MONTHLY,
  YEARLY
}

export interface Debt {

  id: number;
  amount: number;
  type: DebtType;
  since: Date;

}
