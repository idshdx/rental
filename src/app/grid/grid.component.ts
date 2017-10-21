import { Component, OnInit, Input } from '@angular/core';
import { JsonService } from '../json-service.service';
import { Car } from '../car';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  carResults: Array<object> = [];
  discount = 0;
  carTypes: Array<string> = [];

  constructor(private service: JsonService) { }

  ngOnInit() {
    this.service.getJson().subscribe((data: any) => {
      if (data.results && data.discount_percentage) {
        this.carResults = data.results;
        this.discount = data.discount_percentage;

        // I could have implemented an unique pipe(acceptable in my situation with very small array)
        // but decided to go with an implementation that will store unique car types into an variable
        // Sidestory: Angular 1 actually included a "filter" pipe but the team opted to get rid of it in angular 2
        // because the abuse of the filter pipe led people to blame Angular 1
        // for performance issues that were the result of this bad practice.
        // Pipes are for very small data transformations, like formatting numbers or strings(like discount pipe).
        data.results.map((carObj: Car) => {
          if (this.carTypes.indexOf(carObj.type) === -1) {
            this.carTypes.push(carObj.type);
          }
        });
      }
    },
    (error: any) => {
      console.log('Error requesting data: ', error);
      throw new Error('Server error');
    });
  }

  // Get the events sent from the button component

  getNewCarTypes($event: Array<string>) {
    this.carTypes = $event;
  }

  getNewCarResults($event: Array<Car>) {
    this.carResults = $event;
  }

  getNewDiscount($event: number) {
    this.discount = $event;
  }

}
