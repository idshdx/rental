import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JsonService } from '../json-service.service';
import { Car } from '../car';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  carResults: Array<Car> = [];
  discount = 0;
  carTypes: Array<string> = [];
  @Output() newDiscount = new EventEmitter<number>();
  @Output() newCarResults = new EventEmitter<Array<Car>>();
  @Output() newCarTypes = new EventEmitter<Array<string>>();

  constructor(private service: JsonService) { }

  ngOnInit() {
  }
  AddVehicle() {
    this.service.getJson().subscribe((data: any) => {
      if (data.results && data.discount_percentage) {
        console.log('new data after button click: ', data); // intentional logging
        // Emit the new values to the grid component
        this.newDiscount.emit(data.discount_percentage);
        this.newCarResults.emit(data.results);
        // reset previous car types and get new ones
        this.carTypes = [];
        data.results
          .map((carObj: Car) => {
            if (this.carTypes.indexOf(carObj.type) === -1) {
              this.carTypes.push(carObj.type);
            }
          });
          this.carTypes.sort(); // So we don't see the categories mixed up everytime we press the button
        this.newCarTypes.emit(this.carTypes);
      }
    },
    (error: any) => {
      console.log('Error requesting data: ', error);
      throw new Error('Server error');
    });
  }
}
