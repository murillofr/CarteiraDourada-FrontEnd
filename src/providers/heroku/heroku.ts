import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HerokuProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HerokuProvider Provider');
  }

}