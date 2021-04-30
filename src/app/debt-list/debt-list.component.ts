import {Component, Input, OnInit} from '@angular/core';
import { Debtor } from '../debtor';

@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.scss']
})
export class DebtListComponent implements OnInit {

  @Input()
  public debtor?: Debtor;

  constructor() { }

  ngOnInit(): void {
  }

}
