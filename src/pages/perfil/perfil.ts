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
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers: [HerokuProvider]
})
export class PerfilPage {

  private id: String;
  private nome: String;
  private email: String;
  private cnh: String;
  private categoria: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private herokuProvider: HerokuProvider) {
  }

  ionViewCanEnter() {
    this.getUserById(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  getUserById(id) {
    let loading = this.loadingCtrl.create({
      content: 'Buscando infos...',
    });
    loading.present();
  
    this.herokuProvider.getUserById(id).subscribe(
      data => {
        AppModule.id = data.id;
        AppModule.nome = data.nome;
        AppModule.email = data.email;
        AppModule.cnh = data.cnh;
        AppModule.categoria = data.categoria;

        this.id = data.id;
        this.nome = data.nome;
        this.email = data.email;
        this.cnh = data.cnh;
        this.categoria = data.categoria;

        console.log(data);
      },
      err => {
        console.log(err);
        loading.dismiss();
        this.exibirToast("Erro ao buscar infos do Usuário.\nTente novamente.");
      },
      () => {
        loading.dismiss();
        console.log('Infos encontradas');
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