/* eslint-disable no-empty-function */

import { Transport } from './Transport';

/* eslint-disable no-useless-constructor */
export class Flight {
  private readonly _transport: Transport;
  constructor(
    private readonly _destination: string,
    private readonly _price: number,
    private readonly _flightCarrier: string,
    private readonly _flightNumber: string
  ) {
    this._transport = new Transport(
      _price,
      _flightCarrier,
      _flightNumber
    );
  }

  get price() {
    return this._price;
  }
  get destination() {
    return this._destination;
  }

  get transport() {
    return {
      flightCarrier: this._flightCarrier,
      flightNumber: this._flightNumber
    };
  }
}
