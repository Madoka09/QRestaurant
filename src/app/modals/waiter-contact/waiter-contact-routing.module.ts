import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaiterContactPage } from './waiter-contact.page';

const routes: Routes = [
  {
    path: '',
    component: WaiterContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaiterContactPageRoutingModule {}
