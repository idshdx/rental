import { FinalPricePipe } from './final-price.pipe';

describe('FinalPricePipe', () => {
  it('create an instance', () => {
    const pipe = new FinalPricePipe();
    expect(pipe).toBeTruthy();
  });
  it('calculate a final price after discount is applied', () => {
    const price = 50;
    const discount = 10;
    const pipe = new FinalPricePipe();
    expect(pipe.transform(price, discount)).toBe(45);
  });
  it('round the final price after discount is applied', () => {
    const price = 51;
    const discount = 10;
    const pipe = new FinalPricePipe();
    const result = pipe.transform(price, discount);
    expect(result).toEqual(jasmine.any(Number));
    // check the remainder of division by 1 to be sure its not a float
    expect(result % 1).toEqual(0);
  });
});
