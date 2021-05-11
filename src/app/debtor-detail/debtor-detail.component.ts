import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DebtorService } from '../debtor.service';
import { Debtor } from '../debtor';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-debtor-detail',
  templateUrl: './debtor-detail.component.html',
  styleUrls: ['./debtor-detail.component.scss']
})
export class DebtorDetailComponent implements OnInit {

  public debtor: Observable<Debtor | null>;
  public environment = environment;

  constructor(
    private route: ActivatedRoute,
    private debtorService: DebtorService,
    private location: Location
  ) {
    this.debtor = of(null);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.debtor = this.debtorService.getDebtor(id);
  }

  public back(): void {
    this.location.back();
  }

}
