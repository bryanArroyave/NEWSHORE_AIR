import { Component, OnInit } from '@angular/core';
import { ConsumeService } from './services/consumer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'newshore_air';

  constructor(private readonly consumerService: ConsumeService) {

  }

  ngOnInit(): void {
    this.consumerService.getFlights().subscribe((res: any) => {
      console.log(res);
    });
  }
}
