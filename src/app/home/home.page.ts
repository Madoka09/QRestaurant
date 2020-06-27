import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  addressObj: any;
  constructor(private httpC: HttpClient) {}

  ngOnInit(){
    this.fetchJsonData();
  }

  fetchJsonData(){
    this.httpC.get("https://madoka09.github.io/assets/address.json").subscribe((data: any) => {
      this.addressObj = data;
    })
  }
}
