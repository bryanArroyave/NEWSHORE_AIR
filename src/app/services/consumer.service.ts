/* eslint-disable no-restricted-syntax */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import IFligthResponse from '../models/IFligthResponse';
import { Journey } from '../models/Journey';


@Injectable({ providedIn: 'root' })

export class ConsumeService {
  private _journeys: BehaviorSubject<Journey[]> = new BehaviorSubject([]);
  constructor(private readonly http: HttpClient) { }

  getFlights() {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http
      .get<any /* Observable<Journey> */>(
        `${environment.airUrl}/${environment.airDifficulty}`,
        options
      );
  }

  private createData(res: IFligthResponse[]) {
    // const journeys: Journey[] = [];
    // for (const data of res) {
    //   let journey = this.findJourney(journeys, data.departureStation);
    //   if (!journey) {
    //     journey = new Journey(data.departureStation);
    //     journeys.push(journey);
    //   }
    //   journey.addFligth(data.arrivalStation, data.price, data.flightCarrier, data.flightNumber);
    // }
    // this._journeys.next(journeys);
    // return journeys;


    for (const data of res) {

    }
  }

  private findJourney(journeys: Journey[], origin: string) {
    return journeys.find(journey => journey.origin === origin);
  }

  get journeys() {
    return this._journeys.asObservable();
  }
}
