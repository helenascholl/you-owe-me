import { Debt } from './debt';

export default interface Debtor {

  id: number;
  name: string;
  debts: Debt[];

}
