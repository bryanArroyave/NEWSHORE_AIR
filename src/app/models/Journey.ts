/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */

import { Flight } from './Flight';

export class Journey {
  private readonly flights: Flight[];

  constructor(private readonly _origin: string) {
    this.flights = [];
  }

  addFligth(destination: string) {
    this.flights.push(new Flight(destination));
  }


  get origin() {
    return this._origin;
  }
}
