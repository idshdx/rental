import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';
import { FinalPricePipe } from '../final-price.pipe';
import { Car } from '../car';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelComponent, FinalPricePipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    const car: Car = {
        make_model: 'Dacia',
        type: 'Compact',
        provider: 'Random provider',
        price: 50
    };
    const discount = 10;
    component.car = car;
    component.discount = discount;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a discount, car name, car type, image and price', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img')).toBeDefined();
    expect(compiled.querySelector('.car-name')).toBeDefined();
    expect(compiled.querySelector('.car-type')).toBeDefined();
    expect(compiled.querySelector('.car-price')).toBeDefined();
  });
  it('should calculate the final price given an initial price and discount percent', () => {
    const car: Car = {
      make_model: 'Dacia',
      type: 'Compact',
      provider: 'Random provider',
      price: 100
    };
    const discount = 10;
    component.car = car;
    component.discount = discount;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.car-price').textContent).toBe('90');
  });
});
