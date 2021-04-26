import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtorDetailComponent } from './debtor-detail/debtor-detail.component';

const routes: Routes = [
  { path: 'debtors/:id', component: DebtorDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
