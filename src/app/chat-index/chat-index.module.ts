import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module'
import { IonicModule } from '@ionic/angular';
import { ChatIndexPageRoutingModule } from './chat-index-routing.module';

import { ChatIndexPage } from './chat-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatIndexPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ChatIndexPage]
})
export class ChatIndexPageModule {}
