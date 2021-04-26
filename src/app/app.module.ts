import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebtorDetailComponent } from './debtor-detail/debtor-detail.component';
import { DebtorListComponent } from './debtor-list/debtor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DebtorDetailComponent,
    DebtorListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
