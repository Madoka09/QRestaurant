import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-waiter-contact',
  templateUrl: './waiter-contact.page.html',
  styleUrls: ['./waiter-contact.page.scss'],
})
export class WaiterContactPage implements OnInit {
  @Input() table: string
  @Input() waiter: string;
  @Input() restaurant: string;
  constructor(public modalC: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalC.dismiss();
  }

  async enterChat(){
    const modal = await this.modalC.create({
      component: ChatPage,
      componentProps: {
        table: this.table,
        restaurant: this.restaurant
      }
    });
    return await modal.present()
  }

  async callWaiter(){
    const modal = await this.modalC.create({
      component: ChatPage,
      componentProps: {
        table: this.table,
        restaurant: this.restaurant,
        callMsg: `¿Podría venir, porfavor?`
      }
    });
    return await modal.present()
  }

  async requestBill(){
    const modal = await this.modalC.create({
      component: ChatPage,
      componentProps: {
        table: this.table,
        restaurant: this.restaurant,
        callMsg: `¿Podría traer la cuenta, porfavor?`
      }
    });
    return await modal.present();
  }

  async requestTerminal(){
    const modal = await this.modalC.create({
      component: ChatPage,
      componentProps: {
        table: this.table,
        restaurant: this.restaurant,
        callMsg: `Haré mi pago con tarjeta de crédito/débito, ¿Podría traerme la terminal con la cuenta, porfavor?`
      }
    });
    return await modal.present();
  }

}
