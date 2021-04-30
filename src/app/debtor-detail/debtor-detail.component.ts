import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DebtorService } from '../debtor.service';
import { Debtor } from '../debtor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-debtor-detail',
  templateUrl: './debtor-detail.component.html',
  styleUrls: ['./debtor-detail.component.scss']
})
export class DebtorDetailComponent implements OnInit {

  public debtor?: Debtor;
  public dateString = new Date().toISOString();
  public weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(
    private route: ActivatedRoute,
    private debtorService: DebtorService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.debtorService.getDebtor(id)
      .subscribe(debtor => this.debtor = debtor);
  }

  public back(): void {
    this.location.back();
  }

}
