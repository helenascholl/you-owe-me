import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtorListComponent } from './debtor-list/debtor-list.component';
import { DebtorDetailComponent } from './debtor-detail/debtor-detail.component';

const routes: Routes = [
  { path: '', component: DebtorListComponent },
  { path: 'debtors/:id', component: DebtorDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
