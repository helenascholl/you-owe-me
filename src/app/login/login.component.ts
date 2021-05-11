import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);
  public passwordHidden: boolean = true;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.zone.run(() => this.router.navigate(['/debtors']));
      }
    });
  }

  public login(): void {
    if (this.email.value && this.password.value) {
      this.fireAuth.signInWithEmailAndPassword(this.email.value, this.password.value)
        .catch(error => {
          if (['auth/user-not-found', 'auth/invalid-email'].includes(error.code)) {
            this.email.setErrors({ invalid: true });
          } else if (error.code === 'auth/wrong-password') {
            this.password.setErrors({ invalid: true });
          }
        });
    } else if (this.email) {
      this.email.setErrors({ invalid: true });
    } else {
      this.password.setErrors({ invalid: true });
    }
  }

  public keydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

}
