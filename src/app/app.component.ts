/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Component, OnInit } from '@angular/core';
import IFligthResponse from './models/IFligthResponse';
import { AirlineService } from './services/airline.service';
import { ConsumeService } from './services/consumer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'newshore_air';

  constructor(
    private readonly consumerService: ConsumeService,
    private readonly airlineService: AirlineService
  ) { }

  ngOnInit(): void {
    this.consumerService.getFlights().subscribe((res: IFligthResponse[]) => {
      this.airlineService.init(res);
    });
  }

  getPath(origin: string, destination: string, cant: number) {
    this.airlineService.getPath(origin, destination, cant);
  }

  sendData({ origin, destination, cant }: any) {
    this.getPath(origin, destination, cant);
  }
}
