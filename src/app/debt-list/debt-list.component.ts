import { Component, Input } from '@angular/core';
import { Debtor } from '../debtor';
import { DebtType } from '../debt';
import { DebtorService } from '../debtor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { environment } from '../../environments/environment';

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
  public currencySymbol = environment.currencySymbol;

  constructor(
    public debtorService: DebtorService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  public addDebt(): void {
    if (this.debtType && this.amount && this.dateString && this.debtor) {
      this.debtorService.addDebt(this.debtor.id, this.amount, this.debtType, new Date(this.dateString));

      this.debtType = undefined;
      this.amount = undefined;
      this.dateString = undefined;

      this.snackBar.open('Added Debt', 'Close', { duration: 2000 });
    }
  }

  public removeDebt(debtId: number): void {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { name: 'Debt' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.debtorService.removeDebt(debtId);
        this.snackBar.open('Deleted Debt', 'Close', { duration: 2000 });
      }
    });
  }

  public addButtonDisabled(): boolean {
    return !this.amount
      || this.amount < 0
      || !this.debtType
      || !this.dateString;
  }

}
