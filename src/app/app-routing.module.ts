import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'app/:restaurant/:table',
    loadChildren: () => import('./restaurant1/restaurant1.module').then( m => m.Restaurant1PageModule)
  },
  {
    path: 'app/:restaurant',
    loadChildren: () => import('./restaurant1/restaurant1.module').then( m => m.Restaurant1PageModule)
  },
  {
    path: 'app/:restaurant/waiter/:waiterMode',
    loadChildren: () => import('./restaurant1/restaurant1.module').then( m => m.Restaurant1PageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./modals/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'waiter/:restaurant/chat-index/:waiter',
    loadChildren: () => import('./chat-index/chat-index.module').then( m => m.ChatIndexPageModule)
  },
  {
    path: 'chat-waiter',
    loadChildren: () => import('./modals/chat-waiter/chat-waiter.module').then( m => m.ChatWaiterPageModule)
  },
  {
    path: 'waiter-contact',
    loadChildren: () => import('./modals/waiter-contact/waiter-contact.module').then( m => m.WaiterContactPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
