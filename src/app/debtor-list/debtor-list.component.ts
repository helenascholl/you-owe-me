import { Component, OnInit } from '@angular/core';
import { DebtorService } from '../debtor.service';
import { Debtor } from '../debtor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-debtor-list',
  templateUrl: './debtor-list.component.html',
  styleUrls: ['./debtor-list.component.scss']
})
export class DebtorListComponent implements OnInit {

  public debtors: Debtor[];
  public debtorName: string;
  public environment = environment;

  constructor(
    public debtorService: DebtorService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.debtors = [];
    this.debtorName = '';
  }

  ngOnInit(): void {
    this.debtorService.getDebtors()
      .subscribe(debtors => this.debtors = debtors);
  }

  public addDebtor(): void {
    if (this.debtorName !== '') {
      this.debtorService.addDebtor(this.debtorName);
      this.debtorName = '';

      this.snackBar.open('Added Debtor', 'Close', { duration: 2000 });
    }
  }

  public keydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addDebtor();
    }
  }

  public removeDebtor(event: MouseEvent, id: number): void {
    event.stopPropagation();

    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { name: 'Debtor' }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.debtorService.removeDebtor(id);
        this.snackBar.open('Deleted Debtor', 'Close', { duration: 2000 });
      }
    });
  }

}
