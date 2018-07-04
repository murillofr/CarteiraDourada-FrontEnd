import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
})
export class PesquisaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisaPage');
  }

  hideShowNovoVeiculo() {
    document.getElementById("listNovoVeiculo").classList.toggle("showNovoVeiculo");
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'VEÍCULO INCLUIDO... OU NÃO',
      duration: 2000,
      position: 'top',
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
