import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ConquistasPage } from '../pages/conquistas/conquistas';
import { PerfilPage } from '../pages/perfil/perfil';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HerokuProvider } from '../providers/heroku/heroku';

@NgModule({
  declarations: [
    MyApp,
    ConquistasPage,
    PerfilPage,
    PesquisaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConquistasPage,
    PerfilPage,
    PesquisaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HerokuProvider
  ]
})
export class AppModule {}
