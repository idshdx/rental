import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { PanelComponent } from './panel/panel.component';
import { GridComponent } from './grid/grid.component';

import { FinalPricePipe } from './final-price.pipe';

import { JsonService } from './json-service.service';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AbstractMockObservableService } from './mock.service';

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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, ButtonComponent, PanelComponent, GridComponent, FinalPricePipe
      ],
      providers: [
        { provide: JsonService, useValue: MockService },
        { provide: Http, useValue: mockHttpProvider }
      ]
    })
    // Override grid component's provider, we dont need it in this test suite
  .overrideComponent(GridComponent, {
    set: {
      providers: [
        { provide: JsonService, useClass: MockService }
      ]
    }
  })
    .compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Rentalcars.com Task'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Rentalcars.com Task');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Rentalcars.com Task');
  }));
});
