import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from './emoji/emoji.component';

@NgModule({
  declarations: [HeaderComponent, PopoverComponent, EmojiComponent],
  imports: [
    CommonModule,
    IonicModule,
    PickerModule
  ],
  exports: [
    HeaderComponent,
    PopoverComponent,
    EmojiComponent
  ]
})
export class ComponentsModule { }
