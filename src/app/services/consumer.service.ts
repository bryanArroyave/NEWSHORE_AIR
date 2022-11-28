/* eslint-disable no-restricted-syntax */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import IFligthResponse from '../models/IFligthResponse';
import { Journey } from '../models/Journey';

@Injectable({ providedIn: 'root' })
export class ConsumeService {
  constructor(private readonly http: HttpClient) { }

  getFlights() {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http
      .get<any /* Observable<Journey> */>(
        `${environment.airUrl}/${environment.airDifficulty}`,
        options
      )
      .pipe(map(this.createData.bind(this)));
  }

  private createData(res: IFligthResponse[]) {
    const journeys: Journey[] = [];
    for (const data of res) {
      let journey = this.findJourney(journeys, data.departureStation);
      if (!journey) {
        journey = new Journey(data.departureStation);
        journeys.push(journey);
      }
      journey.addFligth(data.arrivalStation);
    }
    return journeys;
  }

  private findJourney(journeys: Journey[], origin: string) {
    return journeys.find(journey => journey.origin === origin);
  }
}
