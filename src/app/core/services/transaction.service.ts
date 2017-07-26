import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Transaction} from "../model/Transaction";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TransactionService {

  constructor(private _http: Http) { } //http service

  // ustvarim providerja s katerim loadam json file in njegove podatke

  get(): Observable<Transaction[]> {
    return this._http.get('assets/transactions.json') //get request za json
      .map(res => res.json().data) //mapam podatke ki so boundani znotraj data noda
      .do(console.log);
      //pazi da importaš vse rxjs opratorje next time
  }
}
