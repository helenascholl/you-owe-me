import { Debt } from './debt';

export default class Debtor {

  public name: string;
  public debts: Debt[];

  constructor(name: string) {
    this.name = name;
    this.debts = [];
  }

}
