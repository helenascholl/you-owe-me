import { Component, Input } from '@angular/core';
import { Debtor } from '../debtor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { DebtorService } from '../debtor.service';
import { DebtType } from '../debt';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent {

  @Input()
  public debtor?: Debtor
  public dateString = new Date().toISOString();
  public weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  public environment = environment;
  public debtType = DebtType;

  constructor(
    private snackBar: MatSnackBar,
    private debtorService: DebtorService
  ) { }

  public pay(): void {
    this.payUntil(new Date(this.dateString));
  }

  public payUntil(date: Date): void {
    if (this.debtor) {
      this.debtorService.payDebts(this.debtor.id, date);
      this.snackBar.open('Paid Debts', 'Close', { duration: 2000 });
    }
  }

}
