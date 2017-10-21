import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { JsonService } from '../json-service.service';
import { HttpClientModule  } from '@angular/common/http';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ButtonComponent ],
      providers: [JsonService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the text `Add Vehicle`', () => {
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.textContent).toContain('Add Vehicle');
  });

  it('should call addVehicle() when the button is clicked', fakeAsync( () => {
    spyOn(component, 'AddVehicle');
    const btn = fixture.nativeElement.querySelector('button');
    btn.click();
    tick(); // simulates the passage of time until all pending asynchronous activities finish
    expect(component.AddVehicle).toHaveBeenCalled();
  }));
});
