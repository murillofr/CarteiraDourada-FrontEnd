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
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
  providers: [HerokuProvider]
})
export class PesquisaPage {

  private veiculos: Array<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private herokuProvider: HerokuProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisaPage');
    this.getVeiculos();
  }

  hideShowNovoVeiculo() {
    document.getElementById("listNovoVeiculo").classList.toggle("showNovoVeiculo");
  }

  getVeiculos() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando veículos...',
    });
    loading.present();
  
    this.herokuProvider.getAllVeiculos().subscribe(
      data => {
        this.veiculos = data;
        console.log(data);
      },
      err => {
        console.log(err);
        loading.dismiss();
        this.exibirToast("Erro ao buscar veiculos.\nTente novamente.");
      },
      () => {
        loading.dismiss();
        console.log('veiculos encontrados');
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
