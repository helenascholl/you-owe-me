import { Component, Input } from '@angular/core';
import { Debtor } from '../debtor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { DebtorService } from '../debtor.service';

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

  constructor(
    private snackBar: MatSnackBar,
    private debtorService: DebtorService
  ) { }

  public pay(): void {
    if (this.debtor) {
      this.debtorService.payDebts(this.debtor.id, new Date(this.dateString));
      this.snackBar.open('Paid Debts', 'Close', { duration: 2000 });
    }
  }

}
