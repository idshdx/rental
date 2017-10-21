// Abstract class for other mocks to extend.
// It provides the basic functionality that an observable provides.
// The extending mock service should just add the methods it needs, returning itself in the method.


import { Subscription } from 'rxjs/Subscription';

export abstract class AbstractMockObservableService {
  protected _subscription: Subscription;
  protected _fakeJson: any;
  protected _fakeError: any;

  set error(err) {
    this._fakeError = err;
  }

  set content(data) {
    this._fakeJson = data;
  }

  get subscription(): Subscription {
    return this._subscription;
  }

  subscribe(next: Function, error?: Function, complete?: Function): Subscription {
    this._subscription = new Subscription();
    spyOn(this._subscription, 'unsubscribe');

    if (next && this._fakeJson && !this._fakeError) {
      next(this._fakeJson);
    }
    if (error && this._fakeError) {
      error(this._fakeError);
    }
    if (complete) {
      complete();
    }
    return this._subscription;
  }
}