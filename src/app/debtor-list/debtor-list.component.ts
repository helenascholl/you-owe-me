import { Component, OnInit } from '@angular/core';
import { DebtorService } from '../debtor.service';
import { Debtor } from '../debtor';

@Component({
  selector: 'app-debtor-list',
  templateUrl: './debtor-list.component.html',
  styleUrls: ['./debtor-list.component.scss']
})
export class DebtorListComponent implements OnInit {

  public debtors: Debtor[];
  public debtorName: string;

  constructor(
    public debtorService: DebtorService
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
    }
  }

  public keydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addDebtor();
    }
  }

}
