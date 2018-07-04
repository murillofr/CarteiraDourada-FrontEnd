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

  getAllVeiculos() {
    var url = `${this.basepath}/veiculos`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


  postAddVeiculo(data) {
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    var myData = JSON.stringify({
      modelo: data.modelo,
      placa: data.placa,
      renavam: data.renavam,
      usuario: AppModule.id
    });
    console.log(myData);
    return this.httpClient.post(this.basepath + '/answers', myData, { headers: headers });
  }

}