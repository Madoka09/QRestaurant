import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Restaurant1Page } from './restaurant1.page';

const routes: Routes = [
  {
    path: '',
    component: Restaurant1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Restaurant1PageRoutingModule {}
