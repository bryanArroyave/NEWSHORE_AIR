/* eslint-disable no-nested-ternary */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/constants';
import { AirlineService } from 'src/app/services/airline.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public flights$: Observable<any>;
  private _currency: Currency = this.defaultCurrency;
  public showDetails: boolean = false;
  constructor(private readonly airlineService: AirlineService, private readonly currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.flights$ = this.airlineService.flights$;
  }

  getValue(value: number) {
    const strategy = this.currencyStrategies[this._currency];
    const parsed = strategy(value);
    return this.currencyService.formatCurrency(parsed, {
      locale: 'es-CO',
      currency: this._currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  getStageMessage(cant: number) {
    return !cant ? 'Directo' : cant === 1
      ? '1 Parada' : `${cant} Paradas`;
  }

  get currencyStrategies() {
    return {
      USD: (value: number) => value,
      EUR: this.currencyService.USDToEUR.bind(this.currencyService),
      COP: this.currencyService.USDToCOP.bind(this.currencyService)
    };
  }

  set currency(currency: Currency) {
    this._currency = currency;
  }

  get currency() {
    return this._currency;
  }

  get defaultCurrency(): Currency {
    return 'USD';
  }
}
