import { AppModule } from '../../app/app.module';
import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { HerokuProvider } from './../../providers/heroku/heroku';

@IonicPage()
@Component({
  selector: 'page-conquistas',
  templateUrl: 'conquistas.html',
  providers: [HerokuProvider]
})
export class ConquistasPage {

  private infracoes: Array<any>;
  private qtdInfracoes: any;
  private diasSemInfracoes: any;

  private dpvat: any;
  private ipva: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private herokuProvider: HerokuProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConquistasPage');
    this.getInfracoesById(1);
    console.log("1 - AppModule.infracoes", AppModule.infracoes);
    //this.getBonificacoesById(1);
  }

  ionViewWillEnter() {
    this.getInfracoesById(1);
    console.log("2 - AppModule.infracoes", AppModule.infracoes);
  }

  ionViewDidEnter() {
    this.getInfracoesById(1);
    console.log("3 - AppModule.infracoes", AppModule.infracoes);
  }

  ionViewCanEnter() {
    this.getInfracoesById(1);
    console.log("4 - AppModule.infracoes", AppModule.infracoes);
  }

  getInfracoesById(id) {
    let loading = this.loadingCtrl.create({
      content: 'Buscando infrações...',
    });
    loading.present();
  
    this.herokuProvider.getInfracoesById(id).subscribe(
      data => {
        this.infracoes = data;
        AppModule.infracoes = data;
        console.log(data);
      },
      err => {
        console.log(err);
        loading.dismiss();
        this.exibirToast("Erro ao buscar infrações do Usuário.\nTente novamente.");
      },
      () => {
        loading.dismiss();
        console.log('Infrações encontradas');
      }
    );
  }

  getBonificacoesById(id) {
    let loading = this.loadingCtrl.create({
      content: 'Buscando bonificações...',
    });
    loading.present();
  
    this.herokuProvider.getBonificacoesById(id).subscribe(
      data => {

        this.dpvat = data.dpvat;
        this.ipva = data.ipva;

        console.log(data);
      },
      err => {
        console.log(err);
        loading.dismiss();
        this.exibirToast("Erro ao buscar bonificações do Usuário.\nTente novamente.");
      },
      () => {
        loading.dismiss();
        console.log('Bonificações encontradas');
      }
    );
  }

  exibirToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
