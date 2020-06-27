import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module'
import { Restaurant1PageRoutingModule } from './restaurant1-routing.module';

import { Restaurant1Page } from './restaurant1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Restaurant1PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Restaurant1Page],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class Restaurant1PageModule {}
