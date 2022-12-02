/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable no-restricted-syntax */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from '../constants';
import { AirGraph } from '../models/Graph';
import IFligthResponse from '../models/IFligthResponse';
import { Journey } from '../models/Journey';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class AirlineService {
  private readonly defaultCurrency: Currency = 'USD';
  private readonly _flights: BehaviorSubject<any> = new BehaviorSubject(null);
  private graph: AirGraph;
  constructor(private readonly alertService: AlertService) { }

  search(journeys: Journey[], origin: string, destination: string) {
    const initial = journeys.find(journey => journey.origin === origin);
    if (initial) {
      const flight = initial.searchFlight(destination);
      if (flight) { return flight; }
    }
    return null;
  }

  init(res: IFligthResponse[]) {
    this.graph = new AirGraph();

    for (const data of res) {
      this.graph.addNode(data.departureStation, data);
      this.graph.addNode(data.arrivalStation, data);
    }
    this.graph.fill();
  }

  getPath(origin: string, destination: string, cant: number = 0) {
    const path = this.graph.getPath(origin, destination, cant);
    const total = this.graph.getTotal(origin, destination);

    if (!path.length) {
      this.alertService.notifyWarning(`No existe una ruta de ${origin} a ${destination}${this.verifyCantMesage(cant)}`);
    }

    this._flights.next({
      origin,
      destination,
      path,
      total
    });
  }

  verifyCantMesage(cant: number) {
    const stage = cant === 1 ? 'escala' : 'escalas';
    return cant ? ` con menos de ${cant} ${stage}` : '';
  }


  get flights$() {
    return this._flights.asObservable();
  }
}
