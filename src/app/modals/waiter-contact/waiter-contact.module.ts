import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaiterContactPageRoutingModule } from './waiter-contact-routing.module';

import { WaiterContactPage } from './waiter-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterContactPageRoutingModule
  ],
  declarations: [WaiterContactPage]
})
export class WaiterContactPageModule {}
