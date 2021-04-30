import { Component, Input } from '@angular/core';
import { Debtor } from '../debtor';
import { DebtType } from '../debt';
import { DebtorService } from '../debtor.service';

@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.scss']
})
export class DebtListComponent {

  @Input()
  public debtor?: Debtor;
  public debtTypes: { index: number, value: string }[] = [{ index: 0, value: 'Daily' }, { index: 1, value: 'Weekly' },
    { index: 2, value: 'Monthly' }, { index: 3, value: 'Yearly' }];
  public debtType?: DebtType;
  public amount?: number;
  public dateString?: string;

  constructor(public debtorService: DebtorService) { }

  public addDebt() {
    if (this.debtType && this.amount && this.dateString && this.debtor) {
      this.debtorService.addDebt(this.debtor.id, {
        amount: this.amount,
        type: this.debtType,
        since: new Date(this.dateString)
      });

      this.debtType = undefined;
      this.amount = undefined;
      this.dateString = undefined;
    }
  }

  public addButtonDisabled(): boolean {
    return this.amount === undefined
      || this.amount < 0
      || !this.debtType
      || !this.dateString
  }

}
