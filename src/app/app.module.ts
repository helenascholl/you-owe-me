import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebtorComponent } from './debtor/debtor.component';
import { DebtorDetailComponent } from './debtor-detail/debtor-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DebtorComponent,
    DebtorDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
