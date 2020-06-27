import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatWaiterPage } from './chat-waiter.page';

const routes: Routes = [
  {
    path: '',
    component: ChatWaiterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatWaiterPageRoutingModule {}
