/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */

import { Flight } from './Flight';

export class Journey {
  private readonly _flights: Flight[];

  constructor(private readonly _origin: string) {
    this._flights = [];
  }

  addFligth(destination: string, price: number, flightCarrier: string, flightNumber: string) {
    this._flights.push(new Flight(destination, price, flightCarrier, flightNumber));
  }

  searchFlight(destination: string) {
    return this._flights.find(flight => flight.destination === destination);
  }

  hasFlight(destination: string) {
    return this.flights.find(flight => flight.destination === destination);
  }

  get flights() {
    return this._flights;
  }


  get origin() {
    return this._origin;
  }
}
