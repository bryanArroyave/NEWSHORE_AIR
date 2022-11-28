/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
export class Transport {
  constructor(
    private readonly _price: number,
    private readonly _flightCarrier: string,
    private readonly _fligthNumber: string
  ) {}

  get price() {
    return this._price;
  }
  get flightCarrier() {
    return this._flightCarrier;
  }
  get fligthNumber() {
    return this._fligthNumber;
  }
}
