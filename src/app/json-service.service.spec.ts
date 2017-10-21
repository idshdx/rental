import { TestBed, inject } from '@angular/core/testing';

import { JsonService } from './json-service.service';
import { HttpClientModule  } from '@angular/common/http';


describe('JsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [JsonService]
    });
  });

  it('should be created', inject([JsonService], (service: JsonService) => {
    expect(service).toBeTruthy();
  }));
  it('should have a getJson() method ', inject([JsonService], (service: JsonService) => {
    const method = service.getJson();
    expect(method).toBeDefined();
  }));
});
