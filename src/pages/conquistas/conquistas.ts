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
      this.getInfracoesById(1);
      //this.getBonificacoesById(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConquistasPage');
  }

  getInfracoesById(id) {
    let loading = this.loadingCtrl.create({
      content: 'Buscando infrações...',
    });
    loading.present();

    setTimeout(() => {
      
      this.herokuProvider.getInfracoesById(id).subscribe(
        data => {
          this.infracoes = data;
          this.qtdInfracoes = this.infracoes.length;
  
          this.calcularDiasSemInfracoes();
  
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

    }, 1500);

  }

  getBonificacoesById(id) {
    let loading = this.loadingCtrl.create({
      content: 'Buscando bonificações...',
    });
    loading.present();

    setTimeout(() => {

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

    }, 1500);

  }

  calcularDiasSemInfracoes() {
    let dataUltimaInfracao = new Date(this.infracoes[0].instante).toLocaleDateString('pt-BR');
    let dataAtual = new Date() + "";

    let data1 = new Date();
    let data2 = new Date()

    var dtInicio = dataUltimaInfracao.split("/");
    var dtFim = dataAtual.split("/");

    data1 = new Date(dtInicio[2] + "/" + dtInicio[1] + "/" + dtInicio[0]);
    data2 = new Date(dtFim[2] + "/" + dtFim[1] + "/" + dtFim[0]);

    // Descartando timezone e horário de verão
    var utc1 = Date.UTC(data1.getFullYear(), data1.getMonth(), data1.getDate());
    var utc2 = Date.UTC(data2.getFullYear(), data2.getMonth(), data2.getDate());

    this.diasSemInfracoes = Math.floor((utc2 - utc1) / ( 1000 * 60 * 60 * 24) );
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
