import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ModalController, ToastController, IonContent, PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { EmojiComponent } from 'src/app/components/emoji/emoji.component';
import {Events} from '../../services/events.service';

@Component({
  selector: 'app-chat-waiter',
  templateUrl: './chat-waiter.page.html',
  styleUrls: ['./chat-waiter.page.scss'],
})
export class ChatWaiterPage implements OnInit {
  @Input() waiterName: string;
  @Input() table: any;
  @Input() restaurant: string;
  @ViewChild("content", { static: false }) content: IonContent;

  typingMsg: boolean = false;
  message = '';
  messages = [];
  currentUser = '';
  name: string;
  getRoom: string;
  typingUser: string;
  typingUserState: boolean = false;
  isOnline: boolean;
  incomingUser: string;
  soundToggle: string;
  emoji: any;
  constructor(public modalC: ModalController, private socket: Socket, private toastC: ToastController, public popoverC: PopoverController, private event: Events) {
    this.event.subscribe('emoji', (data: any) => {
      this.emoji = data.emoji.emoji.native;
      this.message = `${this.message}${this.emoji}`
    })
   }

  ngOnInit() {
    // Stablish connection with socket io server
    //this.socket.connect();

    // identify sender or reciever
    this.name = this.waiterName
    this.currentUser = this.name;

    // Log user in room
    //this.socket.emit('joinRoom', { username: this.name, room: this.restaurant });

    // fetch saved messages
    //localStorage.clear();
    //console.log(JSON.parse(localStorage.getItem('message')));
    this.getAllData();


    this.socket.fromEvent('users-changed').subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        //this.showToast(`${user}, se ha ido`)
        this.isOnline = false
      } else {
        //this.showToast(`${user}, se ha unido`)
        this.isOnline = true
      }
    });

    /*
    // Listen for client message
    this.socket.fromEvent('message').subscribe((message: any) => {
      this.content.scrollToBottom();
      
      this.messages.push(message);
      //console.log(message);
      localStorage.setItem(message.createdAt, JSON.stringify(message));
    })
    */

    // Listen for table message
    this.socket.fromEvent('table-message').subscribe((message: any) => {
      if(message.user === this.table.user){
        this.content.scrollToBottom();
        this.messages.push(message);
        localStorage.setItem(message.createdAt, JSON.stringify(message));
      }
      console.log(message)
     
    })

    // Listen for self message
    this.socket.fromEvent("waiter-message").subscribe((message: any) => {
      if(message.user === this.waiterName){
        this.content.scrollToBottom();
        this.messages.push(message);
        console.log(message);
        localStorage.setItem(message.createdAt, JSON.stringify(message));
      }
    })
  
    // listen for typing event....
    this.socket.fromEvent('typingTable').subscribe(data => {
      this.typingUser = data['user']
      let isTyping = data['typing']

      if (isTyping) {
        this.typingUserState = true;
      } else {
        this.typingUserState = false;
      }
      //console.log(`${this.typingUser} esta escribiendo...`);
    })

  }

  ionViewDidEnter(){
    this.content.scrollToBottom();
  }

  refreshRooms() {
    this.socket.emit('getRooms');
  }

  sendMessage() {
    this.socket.emit('waiter-message', { text: this.message, id: this.table.id, room: this.restaurant, destination: this.table });
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
        // Push self messages
        if(sortedData[j].destination === this.table.user && sortedData[j].waiter){
          this.messages.push(sortedData[j]);
        }
        
      } catch (e) {
        console.log(e);
      }

      try{
         // Push table messages
         if(sortedData[j].user === this.table.user && sortedData[j].table){
          //console.log('estos si')
          this.messages.push(sortedData[j]);
          //console.log(sortedData)
        } 
      } catch(e) {
        console.log(e)
      }

    }
    console.log(sortedData);

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
    this.socket.emit('typingWaiter', { typing: this.typingMsg, destination: this.table.id })

    setTimeout(() => {
      this.typingMsg = false
      this.socket.emit('typingWaiter', { typing: this.typingMsg, destination: this.table.id })
    }, 1500);
    */
   console.log('Escribiendo, deshabilitado temporalmente')
  }

  async presentPop(ev: any){
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
