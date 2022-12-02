import { Injectable } from '@angular/core';
import { ICurrencyFormatOptions } from '../models/ICurrencyFormatOptions';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  USDToEUR(value: number) {
    return value * 0.97;
  }

  USDToCOP(value: number) {
    return value * 4835.09;
  }


  formatCurrency(value: number, options?: ICurrencyFormatOptions) {
    return new Intl.NumberFormat(options?.locale || this.defaultCurrencyOption.locale, {
      style: 'currency',
      currency: options?.currency || this.defaultCurrencyOption.currency,
      minimumFractionDigits: options?.minimumFractionDigits || this.defaultCurrencyOption.minimumFractionDigits,
      maximumFractionDigits: options?.maximumFractionDigits || this.defaultCurrencyOption.maximumFractionDigits
    }).format(value);
  }

  get defaultCurrencyOption(): ICurrencyFormatOptions {
    return {
      locale: 'es-CO',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    };
  }
}
