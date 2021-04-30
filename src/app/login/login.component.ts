import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);
  public passwordHidden: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  public login(): void {
  }

  public keydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

}
