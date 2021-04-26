import { Component } from '@angular/core';
import Debtor from './debtor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public debtors: Debtor[] = [
    new Debtor('test1'),
    new Debtor('test2')
  ];

}
