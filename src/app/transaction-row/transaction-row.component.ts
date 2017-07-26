import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../core/model/Transaction";

export enum filters {
  datum = 1 ,
  upravicenci = 2,
  znesek = 3
}

@Component({
  selector: 'app-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.css']
})

export class TransactionRowComponent implements OnInit {

  public sortPoDatumu = true;
  public sortPoUpravicencih = false;
  public sortPoZnesku = false;
  public transactionsLog;
  private transactionsBackup; 
  @Input('transactions')
  set transactions(value: Transaction[]) {
    this.transactionsLog = this.transactionsBackup = value;
  }
  constructor() {
  }

  ngOnInit() {
  }

  handleSearch(term) { //ko prejmemo ta event moramo modificirati te podatke
    this.transactionsLog = this.transactionsBackup; //backup & sprememba
    if (term.length === 0) {
      return; //exit
    }
    //če ga imamo, pa ga modificiramo
    //filter passa objekte ki jih imamo v arayu
    //matcham imena prodajalcev(merchante)
    this.transactionsLog = this.transactionsLog.filter(obj => obj.merchant.toLowerCase().indexOf(term.toLowerCase()) !== -1); 
    //dobim boolean value, če je true, ga filtiram ven
  }

  handleSort(type) {
    switch (type) {
      case filters.datum: //matcha?
        this.handleSortDatumi(); //triggeraj
        break;

      case filters.upravicenci:
        this.handleSortUpravicenci();
        break;

      case filters.znesek:
        this.handleSortZnesek();
        break;
    }
  }

  handleSortDatumi() {
    this.sortPoDatumu = !this.sortPoDatumu;
    this.transactionsLog = this.transactionsLog.sort((logA: Transaction, logB: Transaction) => { //sortiram
      if (this.sortPoDatumu) {
        return logB.transactionDate - logA.transactionDate;
      } else {
        return logA.transactionDate - logB.transactionDate;
      }
    });
  }

  handleSortUpravicenci() {
    this.sortPoUpravicencih = !this.sortPoUpravicencih;
    this.transactionsLog = this.transactionsLog.sort((logA: Transaction, logB: Transaction) => { //sortiram
      if (this.sortPoUpravicencih) {
        return logA.merchant < logB.merchant;
      } else {
        return logA.merchant > logB.merchant;
      }
    });
  }

  handleSortZnesek() {
    this.sortPoZnesku = !this.sortPoZnesku;
    this.transactionsLog = this.transactionsLog.sort((logA: Transaction, logB: Transaction) => { //sortiram
      if (this.sortPoZnesku) {
        return logA.amount < logB.amount;
      } else {
        return logA.amount > logB.amount;
      }
    });
  }

}
