import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AppModule } from '../../app/app.module';

@Injectable()
export class HerokuProvider {
  basepath = "/carteira-dourada-api"

  teste: any = {};

  constructor(
    private http: Http,
    public httpClient: HttpClient,
    private _platform: Platform
  ) {
    if (this._platform.is("cordova")) {
      this.basepath = "https://carteira-dourada-api.herokuapp.com";
    }
  }

  getUserById(id) {
    var url = `${this.basepath}/usuarios/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getInfracoesById(id) {
    var url = `${this.basepath}/infracoes/usuarios/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getBonificacoesById(id) {
    var url = `${this.basepath}/bonificacoes/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  getAllVeiculos() {
    var url = `${this.basepath}/veiculos`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


  postAddVeiculo(data) {

    this.teste.id = AppModule.id;
    this.teste.nome = AppModule.nome;
    this.teste.email = AppModule.email;
    this.teste.cnh = AppModule.cnh;
    this.teste.categoria = AppModule.categoria;

    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    var myData = JSON.stringify({
      modelo: data.modelo,
      placa: data.placa,
      renavam: data.renavam,
      usuario: this.teste
    });
    console.log("myData");
    console.log(myData);
    return this.httpClient.post(`${this.basepath}/veiculos`, myData, { headers: headers });
  }

}