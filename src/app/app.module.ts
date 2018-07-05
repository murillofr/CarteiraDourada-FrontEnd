import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HerokuProvider } from '../providers/heroku/heroku';

import { ConquistasPage } from '../pages/conquistas/conquistas';
import { PerfilPage } from '../pages/perfil/perfil';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';
import { TabsPage } from '../pages/tabs/tabs';

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
    HttpModule,
    HttpClientModule,
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
export class AppModule {
  public static id: String;
  public static nome: String;
  public static email: String;
  public static cnh: String;
  public static categoria: String;
  public static infracoes: any;
}