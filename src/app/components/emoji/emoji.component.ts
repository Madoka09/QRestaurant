import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import {Events} from '../../services/events.service';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss'],
})
export class EmojiComponent implements OnInit {

  constructor(public alertC: AlertController, public popoverC: PopoverController, public modalC: ModalController, private event: Events) { }

  ngOnInit() {

  }

  addEmoji(ev){
    this.event.publish('emoji', {
      emoji: ev
    });
  }

}
