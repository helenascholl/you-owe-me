import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public fireAuth: AngularFireAuth,
    public router: Router,
    public zone: NgZone
  ) { }

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged(user => {
      if (!user) {
        this.zone.run(() => this.router.navigate(['/login']));
      }
    });
  }

}
