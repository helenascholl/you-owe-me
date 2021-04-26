import { Component, Input } from '@angular/core';
import Debtor from '../debtor';

@Component({
  selector: 'app-debtor',
  templateUrl: './debtor.component.html',
  styleUrls: ['./debtor.component.scss']
})
export class DebtorComponent {

  @Input()
  public debtor?: Debtor;

  constructor() { }

}
