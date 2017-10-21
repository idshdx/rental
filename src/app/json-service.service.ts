import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JsonService {

  readonly url: string  = 'http://localhost:3000/api/cars';

  constructor(private http: HttpClient)  { }

  getJson(): Observable<any> {
    return this.http.get(this.url);
  }

}
