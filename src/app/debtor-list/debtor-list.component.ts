import { Component, OnInit } from '@angular/core';
import { DebtorService } from '../debtor.service';
import { Debtor } from '../debtor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-debtor-list',
  templateUrl: './debtor-list.component.html',
  styleUrls: ['./debtor-list.component.scss']
})
export class DebtorListComponent implements OnInit {

  public debtors: Debtor[];
  public debtorName: string;

  constructor(
    public debtorService: DebtorService,
    public snackBar: MatSnackBar
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

}
