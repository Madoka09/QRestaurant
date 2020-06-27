import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(public alertC: AlertController, public popoverC: PopoverController, public modalC: ModalController) { }

  ngOnInit() {}

  eraseMessages(){
    this.eraseMessagesConfirm();
  }

  async eraseMessagesConfirm() {
    const alert = await this.alertC.create({
      header: '¡Se borrarán todos los mensajes!',
      subHeader: 'Esta acción no puede deshacerse, se borrarán TODOS los mensajes de TODAS las conversaciones.',
      message: '¿Está seguro?, al volver a entrar al chat no habrá historial de conversaciones.',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Borrar',
          cssClass: 'danger',
          handler: () => {
            localStorage.clear();
            this.modalC.dismiss();
            this.popoverC.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }
}
