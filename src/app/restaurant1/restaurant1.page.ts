import { Component, OnInit } from '@angular/core';
import { defineCustomElements } from '@teamhive/pdf-viewer/dist/loader';
defineCustomElements(window);
import { AlertController} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../modals/chat/chat.page';
import { ActivatedRoute } from "@angular/router";
import { Socket } from 'ngx-socket-io';
import { WaiterContactPage } from '../modals/waiter-contact/waiter-contact.page';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant1',
  templateUrl: './restaurant1.page.html',
  styleUrls: ['./restaurant1.page.scss'],
})
export class Restaurant1Page implements OnInit {

  pdfSrc: string;
  view: Boolean;
  table: string;
  waiterMode: string;
  waiter: string;
  waiterName: string;
  restaurant: string;
  address: string;
  schedule: string;
  tel: string;
  constructor(public alertC: AlertController, public modalC: ModalController, public route: ActivatedRoute, private socket: Socket, private httpC: HttpClient) { }

  ngOnInit() {
    this.fetchJsonData();
    // Access table
    this.route.paramMap.subscribe(params => {
      this.table = params.get('table');
      this.waiterMode = params.get('waiterMode');
      this.restaurant = params.get('restaurant');
    })

    if(this.waiterMode){
      this.waiterChat();
    }

    this.view = false;
    this.pdfSrc = `https://madoka09.github.io/assets/restaurant-menus/${this.restaurant}.pdf`
  }

  viewMenu(){
    if (this.view == false){
      this.view = true
    }
  }

  hideMenu(){
    if (this.view == true){
      this.view = false
    }
  }

  download(){
    window.open(this.pdfSrc)
  }

  fetchJsonData(){
    this.httpC.get("https://madoka09.github.io/assets/address.json").subscribe(data => {
      this.address = data[this.restaurant].address;
      this.schedule = data[this.restaurant].schedule;
      this.tel = data[this.restaurant].tel;
    })
  }

  async presentAlert() {
    const alert = await this.alertC.create({
      header: 'Advertencia',
      message: 'Esta opción, podría no funcionar bien en dispositivos básicos, ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.viewMenu();
          }
        }
      ]
    })

    await alert.present();
  }

  async enterChat(){
    const modal = await this.modalC.create({
      component: ChatPage,
      componentProps: {
        table: this.table,
        waiter: this.waiter,
        restaurant: this.restaurant
      }
    });
    return await modal.present()
  }

  async waiterChat() {
    const alert = await this.alertC.create({
      header: '¡Hey!',
      subHeader: 'Parece que eres un mesero, ¿Cómo te llamas?',
      inputs: [
        {
          name: 'waiter',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.leaveConfirm();
          }
        },
        {
          text: 'Entrar',
          handler: data => {
            this.waiter = `${this.restaurant}-${data.waiter}`
            this.waiterName = data.waiter;
            console.log(`waiter: ${this.waiter}`)
          }
        }
      ]
    })
    await alert.present();

  }

  async leaveConfirm() {
    const alert = await this.alertC.create({
      header: '¿Estás seguro?',
      subHeader: 'Tendrás que reiniciar la aplicación para poder introducir tu nombre...',
      buttons: [
        {
          text: 'Adiós',
          handler: () => {
            this.modalC.dismiss();
          }
        },
        {
          text: 'Introducir Nombre',
          handler: () => {
            this.waiterChat();
          }
        }
      ]
    })
    await alert.present();
  }

  async waiterOptions(){
    const modal = await this.modalC.create({
      component: WaiterContactPage,
      componentProps: {
        table: this.table,
        waiter: this.waiter,
        restaurant: this.restaurant
      }
    });
    return await modal.present()
  }

}
