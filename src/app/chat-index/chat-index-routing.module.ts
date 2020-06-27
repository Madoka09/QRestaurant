import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatIndexPage } from './chat-index.page';

const routes: Routes = [
  {
    path: '',
    component: ChatIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatIndexPageRoutingModule {}
