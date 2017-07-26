import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {filters} from "../transaction-row/transaction-row.component";

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  //dostopam do tagov plantanih znotraj spanov
  @ViewChild('znesek') znesek;
  @ViewChild('upravicenci') upravicenci;
  @ViewChild('datum') datum;

  @Output() onSearch = new EventEmitter(); //ko nekdo tipka v search
  @Output() onFilter = new EventEmitter(); //ko je filter kliknjen, emita novo vrednost

  public sortPoDatumu = true; //enega nastavim na true, ostale false
  public sortPoUpravicencih = false;
  public sortPoZnesku = false;
  public keyUpSubject = new Subject<string>();

  constructor() {
  }

  ngOnInit() {//throtlam funkcijo z naslednjimi ukazi
    const onKeyUpEvent = this.keyUpSubject  //ker je const bo klicana samo 1x ko bo klican konstruktor
      .debounceTime(250) //funkcija runa samo med 250 milisec
      .distinctUntilChanged() //detecta spremembo in takrat se sproži in cancela prejšnjo
      .flatMap((search) => { //združim observable skupaj z flatMap
        return Observable.of(search).delay(100); //ta delay mora biti manjši kot debounce
      })
      .subscribe((value) => { //ko imamo observable, moramo subscribati na njega
        this.onSearch.emit(value); //moramo emitat vrednost ki jo dobimo
      });

    this.handleSort(1);
  }

  filter(val) { // trigeramo s kliki na gumbe od filtrov
    this.handleSort(val);
    this.onFilter.emit(val);
  }

  //odstranim puščice
  removeClass() {
    this.znesek.nativeElement.className = '';
    this.datum.nativeElement.className = '';
    this.upravicenci.nativeElement.className = '';
  }

  handleSort(type) { //checkamo tip filtra
    this.removeClass();
    switch (type) {
      case filters.datum:
        this.sortPoDatumu = !this.sortPoDatumu; //reversam true/false
        this.datum.nativeElement.className = (this.sortPoDatumu ? 'up' : 'down') + ' active'; //reversam tudi arrowe
        break;

      case filters.upravicenci:
        this.sortPoUpravicencih = !this.sortPoUpravicencih;
        this.upravicenci.nativeElement.className = (this.sortPoUpravicencih ? 'up' : 'down') + ' active';
        break;

      case filters.znesek:
        this.sortPoZnesku = !this.sortPoZnesku;
        this.znesek.nativeElement.className = (this.sortPoZnesku ? 'up' : 'down') + ' active';
        break;
    }
  }

}
