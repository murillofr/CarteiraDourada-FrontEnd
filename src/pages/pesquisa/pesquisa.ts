import { AppModule } from '../../app/app.module';
import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams,
  LoadingController,
  ToastController,
  AlertController
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
  dataPost: any = {};

  modelo: any;
  placa: any;
  renavam: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
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

    setTimeout(() => {

      this.herokuProvider.getAllVeiculos().subscribe(
        data => {
          this.veiculos = data;
          console.log(data);
          
          // let x = document.getElementsByClassName("cardVeiculos") as HTMLCollectionOf<HTMLElement>;
          // console.log(x);
          // let i;
          // for (i = 0; i < x.length; i++) {
          //   x[i].style.opacity = "1";
          // }

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

    }, 1500);

  }

  postAddVeiculo() {

    this.dataPost.modelo = this.modelo;
    this.dataPost.placa = this.placa;
    this.dataPost.renavam = this.renavam;

    let loading = this.loadingCtrl.create({
      content: 'Adicionando veículo...',
    });
    loading.present();

    setTimeout(() => {

      console.log(this.dataPost);
      this.herokuProvider.postAddVeiculo(this.dataPost).subscribe(data => {
        console.log('resposta', data);
        loading.dismiss();
        this.showAlert();
      }, error => {
        if (error['status'] == 201) {
          loading.dismiss();
        }
        else
          console.log("Oooops!", error);
          loading.dismiss();
      });

    }, 1500);

  }

  exibirToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oh Yeah!',
      subTitle: 'Veículo incluido com sucesso.',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          console.log("Veículo incluido com sucesso.");
          this.hideShowNovoVeiculo();
          this.modelo = "";
          this.placa = "";
          this.renavam = "";
          this.getVeiculos();
        }
      }]
    });
    alert.present();
  }
  
}
