import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatWaiterPageRoutingModule } from './chat-waiter-routing.module';

import { ChatWaiterPage } from './chat-waiter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatWaiterPageRoutingModule
  ],
  declarations: [ChatWaiterPage]
})
export class ChatWaiterPageModule {}
