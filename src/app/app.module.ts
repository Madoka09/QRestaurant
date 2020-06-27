import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ComponentsModule } from './components/components.module'
import { environment } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), ComponentsModule, SocketIoModule.forRoot(config), HttpClientModule, PickerModule, EmojiModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
