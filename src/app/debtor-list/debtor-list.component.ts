import { Component, OnInit } from '@angular/core';
import { DebtorService } from '../debtor.service';
import Debtor from '../debtor';

@Component({
  selector: 'app-debtor-list',
  templateUrl: './debtor-list.component.html',
  styleUrls: ['./debtor-list.component.scss']
})
export class DebtorListComponent implements OnInit {

  public debtors: Debtor[];

  constructor(
    public debtorService: DebtorService
  ) {
    this.debtors = [];
  }

  ngOnInit(): void {
    this.debtorService.getDebtors()
      .subscribe(debtors => this.debtors = debtors);
  }

}
