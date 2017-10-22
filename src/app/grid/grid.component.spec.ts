import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { PanelComponent } from '../panel/panel.component';
import { ButtonComponent } from '../button/button.component';
import { FinalPricePipe } from '../final-price.pipe';
import { JsonService } from '../json-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { slideInLeftAnimation, slideInDownAnimation, fadeAnimation } from '../animations';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AbstractMockObservableService } from '../mock.service';
import { Car } from '../car';

class MockService extends AbstractMockObservableService {
  getJson() {
    return this;
  }
}

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
  }
};

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  const mockService = new MockService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComponent, PanelComponent, ButtonComponent, FinalPricePipe ],
      providers: [
        { provide: JsonService, useValue: mockService },
        { provide: Http, useValue: mockHttpProvider }
      ],
      imports: [ BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getJson() after component rendering', () => {
    const service = fixture.debugElement.injector.get(JsonService);
    // Setup spy on the `getJson` method
    const spy = spyOn(service, 'getJson').and.returnValue({ subscribe: () => {} });
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  describe('getNewCarResults', () => {
    it('should add a new car result', fakeAsync(() => {
      component.carResults = [];
      const newCarResults: Array<Car> =
      [{make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50},
      {make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50},
      {make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50},
      {make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50},
      {make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50}]; // 5 cars from req

      const expected: Array<Car> =
      [{make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50}];
      // picking a random vehicle
      component.getNewCarResults(newCarResults);
      tick();
      expect(component.carResults).toEqual(expected);
      // expect(computed).toBe(expected);
    }));
    it( 'should increse the size of the list of vehicles', fakeAsync(() => {
      component.carResults = [];
      const carResults: Array<Car> =
      [{make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50},
      {make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50},
      {make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50},
      {make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50},
      {make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50}];
      component.getNewCarResults(carResults);
      tick();
      expect(component.carResults.length).toBe(1);
    }));
  });

});
