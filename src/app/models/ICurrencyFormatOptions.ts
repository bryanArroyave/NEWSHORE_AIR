import { Currency } from '../constants';

export interface ICurrencyFormatOptions {
  locale: string;
  currency: Currency;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}
