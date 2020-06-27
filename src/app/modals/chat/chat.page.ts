import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, ToastController, IonContent, PopoverController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from "@angular/router";
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { EmojiComponent } from 'src/app/components/emoji/emoji.component';
import {Events} from '../../services/events.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @Input() table: string;
  @Input() restaurant: string;
  @Input() callMsg: string;
  @ViewChild("content", { static: false }) content: IonContent;

  typingMsg: boolean = false;
  message = '';
  messages = [];
  currentUser = '';
  name: string;
  typingUser: string;
  typingUserState: boolean = false;
  isOnline: boolean;
  incomingUser: any = [];
  localMessages: any = [];
  emoji: any;
  constructor(public modalC: ModalController, private socket: Socket, private toastC: ToastController, private route: ActivatedRoute, public popoverC: PopoverController, private event: Events) {
    this.event.subscribe('emoji', (data: any) => {
      this.emoji = data.emoji.emoji.native;
      this.message = `${this.message}${this.emoji}`
    })
   }

  ngOnInit() {
    // Stablish connection with socket io server
    this.socket.connect();

    //console.log(`el restaurante es ${this.restaurant}`)
    // identify sender or reciever
    this.name = `${this.restaurant}-${this.table}`;
    this.currentUser = this.name;

    // Log user in room
    this.socket.emit('joinRoom', { username: this.name, room: this.restaurant });

    if (this.callMsg) {
      this.socket.emit('send-message', { text: this.callMsg, room: this.restaurant })
    }
    //console.log(`Evento: ${this.callMsg}`)

    // fetch saved messages
    //localStorage.clear();
    this.getAllData();

    this.socket.fromEvent('users-changed').subscribe(data => {
      //this.incomingUser = data['user'];
      if (data['event'] === 'left') {
        //this.showToast(`${user}, se ha ido`)
        this.isOnline = false
      } else {
        //this.showToast(`${user}, se ha unido`)
        this.isOnline = true;
      }
    });

    // get room info
    this.socket.fromEvent('roomUsers').subscribe(data => {
      let room = data['room'];
      let users = data['users'];

      //console.log(`en el cuarto ${room} estan los usuarios ${users}`)
    })

    /*
    this.socket.fromEvent('message').subscribe((message: any) => {
      this.content.scrollToBottom()
      // get only username
      var truncateSlash = message.user.split("-")[1];

      console.log(message);
      if(truncateSlash === this.table){
        this.messages.push(message);
        localStorage.setItem(message.createdAt, JSON.stringify(message));
      }

      if(message.waiter){
        this.messages.push(message);
        localStorage.setItem(message.createdAt, JSON.stringify(message));
      }

    })
    */

    //Listen for self message
    this.socket.fromEvent("table-message").subscribe((message: any) => {
      if(message.user === this.name){
        this.content.scrollToBottom();
        this.messages.push(message)
        localStorage.setItem(message.createdAt, JSON.stringify(message));
        console.log(message)
      }
    })

    //Listen for waiter message
    this.socket.fromEvent("waiter-message").subscribe((message: any) => {
      this.content.scrollToBottom();
      this.messages.push(message);
      localStorage.setItem(message.createdAt, JSON.stringify(message));
      console.log(message)
    })



    // listen for typing event....
    this.socket.fromEvent('typingWaiter').subscribe(data => {
      this.typingUser = data['user']
      let isTyping = data['typing']

      if (this.typingUser !== this.currentUser) {
        if (isTyping) {
          this.typingUserState = true;
        } else {
          this.typingUserState = false;
        }
      } else {
        //console.log('yo estoy escribando :u')
      }
      //console.log(`${this.typingUser} esta escribiendo...`);
    })
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  sendMessage() {
    this.socket.emit('send-message', { text: this.message, room: this.restaurant });
    //console.log(`emitiendo ${JSON.stringify({ text: this.message, room: this.restaurant })}`)
    this.message = '';
  }

  getAllData() {
    let data = [];
    let keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      data.push(JSON.parse(localStorage.getItem(keys[i])))
    }

    // sort elements by date
    let sortedData = data.sort((b, a) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    for (let j = 0; j <= sortedData.length; j++) {
      try {

        // push Self messages
        if (sortedData[j].user === this.name) {
          this.messages.push(sortedData[j]);
          //console.log(sortedData)
        } 
        
        // push waiter messages
        if(this.name === sortedData[j].destination && sortedData[j].waiter){
          this.messages.push(sortedData[j]);
        }

        else {
          //console.log('como que no :(')
        }
      } catch (e) {
        //console.log(e);
      }
    }
    //console.log(sortedData);
  }


  async showToast(msg) {
    let toast = await this.toastC.create({
      message: msg,
      position: 'middle',
      duration: 1500,
    });
    toast.present();
  }

  dismiss() {
    this.modalC.dismiss({
      'dismissed': true
    })
  }


  typing() {
    /*
    this.typingMsg = true
    this.socket.emit('typingTable', { typing: this.typingMsg });

    setTimeout(() => {
      this.typingMsg = false
      this.socket.emit('typingTable', { typing: this.typingMsg });
    }, 1500);
    */
   console.log('Escribiendo, deshabilitado temporalmente')
  }

  async presentPop(ev: any) {
    const popover = await this.popoverC.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });

    return await popover.present();
  }

  async emojiPop(ev: any){
    const popover = await this.popoverC.create({
      component: EmojiComponent,
      event: ev,
      translucent: true
    });

    return await popover.present();
  }

  
}
