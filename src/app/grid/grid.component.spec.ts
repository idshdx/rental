import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { PanelComponent } from '../panel/panel.component';
import { ButtonComponent } from '../button/button.component';
import { FinalPricePipe } from '../final-price.pipe';

import { JsonService } from '../json-service.service';

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
      ]
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

  describe('getNewCarTypes', () => {
    it('should assign new car types', () => {
      component.carTypes = [];
      const newCarTypes = ['SUV', 'Enterprise'];
      component.getNewCarTypes(newCarTypes);
      expect(component.carTypes).toBe(newCarTypes);
    });
  });

  describe('getNewCarResults', () => {
    it('should assign new car results', () => {
      component.carResults = [];
      const carResults: Array<Car> = [{make_model: 'Dacia', type: 'SUV', provider: 'provider', price: 50}];
      component.getNewCarResults(carResults);
      expect(component.carResults).toBe(carResults);
    });
  });

  describe('getNewDiscount', () => {
    it('should assign a new discount', () => {
      component.discount = 1;
      component.getNewDiscount(2);
      expect(component.discount).toBe(2);
    });
  });

});
