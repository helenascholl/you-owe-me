import {Component, Input, OnInit} from '@angular/core';
import Debtor from '../debtor';

@Component({
  selector: 'app-debtor',
  templateUrl: './debtor.component.html',
  styleUrls: ['./debtor.component.scss']
})
export class DebtorComponent implements OnInit {

  @Input()
  public debtor?: Debtor;

  constructor() { }

  ngOnInit(): void {
  }

}
