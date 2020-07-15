import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from "@angular/router";
import { ChatWaiterPage } from '../modals/chat-waiter/chat-waiter.page';
import { Howl } from 'howler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-chat-index',
  templateUrl: './chat-index.page.html',
  styleUrls: ['./chat-index.page.scss'],
})
export class ChatIndexPage implements OnInit {

  waiter: string;
  rooms: any = [];
  tables: any = []
  table: any;
  readedMessage: boolean;
  messages: any = [];
  restaurant: string;
  users: any = [];
  messageState: any = [];
  constructor(public alertC: AlertController, public modalC: ModalController, private socket: Socket, private toastC: ToastController, public route: ActivatedRoute) { }

  ngOnInit() {
    // Access table 
    this.route.paramMap.subscribe(params => {
      this.restaurant = params.get('restaurant');
      this.waiter = params.get('waiter')
      //console.log(`El restaurante es ${this.restaurant}`);
      //console.log(`El mesero es ${this.waiter}`);

    })

    //this.waiterChat();

    //localStorage.clear();
    // Stablish connection with socket io server
    this.socket.connect();

    this.socket.emit('joinRoom', { username: this.waiter, room: this.restaurant });
    //console.log(`Uniendo a ${this.waiter} al cuarto ${this.restaurant}`)

    this.updateRooms();

    this.socket.fromEvent('broadcast').subscribe(data => {
      let room = data;
      if (this.tables.includes(data)) {
        //this.getRooms();
        //console.log('Viva la pachamama')
      } else {
        this.tables.push(room)
        //this.getRooms();
      }
      //console.log(this.tables)
    })

    /*
    this.socket.fromEvent('save-local').subscribe((data: any) => {
      let sound = new Howl({
        src: ['assets/notification.mp3']
      });
      this.readedMessage = true;
      this.messageState.push(data.user);

      if(this.restaurant === data.room){
        sound.play();
      }
      localStorage.setItem(data.createdAt, JSON.stringify(data));
      //console.log(`HEY ${data}`)
      //console.log(`message state ${this.messageState}`)
    })
    */
    this.socket.fromEvent('table-message').subscribe((message: any) => {
      let sound = new Howl({
        src: ['assets/notification.mp3']
      });
      //this.readedMessage = true;
      // check if new message user already exists 
      if(this.messageState.indexOf(message.user) === -1){
        this.messageState.push(message.user);
      }
      
      if(this.restaurant === message.room){
        sound.play();
        this.messages.push(message);
        localStorage.setItem(message.createdAt, JSON.stringify(message));
      }
      //this.content.scrollToBottom()
      
      console.log(message.user);
      console.log(this.restaurant);

    })


  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  /*
  getRooms() {
    this.socket.emit('getRooms');
  }

  updateRooms() {
    this.socket.fromEvent('getRooms').subscribe((data: any) => {
      this.rooms = data;
      console.log(this.rooms)
      //console.log(`data.restaurant contiene: ${data[0].restaurant}`)

    })
  }
  */

  // get room info
  updateRooms() {
    this.socket.fromEvent('roomUsers').subscribe((data: any) => {

      this.rooms = data['users'];
    })
  }

  values(index, item) {
    return (item);
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
            this.waiter = data.waiter
            //console.log(`waiter: ${this.waiter}`)
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
          text: 'Adiós'
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

  async enterWaiterChat(table) {
    // get index 
    const index = this.messageState.indexOf(table.user);

    // pop element from array
    if (index !== -1) {
      this.messageState.splice(index, 1);

    }
    //console.log(`after splice ${this.messageState}`)
    this.table = table;
    const modal = await this.modalC.create({
      component: ChatWaiterPage,
      componentProps: {
        waiterName: this.waiter,
        table: table,
        restaurant: this.restaurant
      }
    });

    modal.onDidDismiss()
      .then(() => {
      })

    return await modal.present();

  }

  async showToast(msg) {
    let toast = await this.toastC.create({
      message: msg,
      position: 'middle',
      duration: 1500,
    });
    toast.present();
  }

  closeAllSockets() {
    this.socket.removeAllListeners();
  }
}
