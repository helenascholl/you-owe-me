import { Component, OnInit } from '@angular/core';
import { DebtorService } from './debtor.service';
import Debtor from './debtor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
