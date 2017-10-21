import { Component, Input } from '@angular/core';
import { Car } from '../car';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() car: Car;
  @Input() discount: number;
  constructor() { }

}
