import { Component, OnInit } from '@angular/core';
import { DebtorService } from '../debtor.service';
import { Debtor } from '../debtor';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-debtor-list',
  templateUrl: './debtor-list.component.html',
  styleUrls: ['./debtor-list.component.scss']
})
export class DebtorListComponent implements OnInit {

  public debtors: Debtor[];
  public debtorName = new FormControl('', [Validators.required]);

  constructor(
    public debtorService: DebtorService
  ) {
    this.debtors = [];
  }

  ngOnInit(): void {
    this.debtorService.getDebtors()
      .subscribe(debtors => this.debtors = debtors);
  }

  public addDebtor(): void {
    if (this.debtorName.valid) {
      this.debtorService.addDebtor(this.debtorName.value);
    }
  }

}
