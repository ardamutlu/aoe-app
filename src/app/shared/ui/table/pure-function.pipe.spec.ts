import { TestBed } from '@angular/core/testing';
import { PureFunctionPipe } from './pure-function.pipe';

describe('PureFunctionPipe', () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let pipe: PureFunctionPipe<any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PureFunctionPipe],
    });
    pipe = TestBed.inject(PureFunctionPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform input using the provided function', () => {
    const handler = (n: number) => n * n;
    const input = 5;
    const result = pipe.transform(handler, input);

    expect(result).toBe(25);
  });

  it('should work with a string manipulation function', () => {
    const handler = (str: string) => str.toUpperCase();
    const input = 'hello';
    const result = pipe.transform(handler, input);

    expect(result).toBe('HELLO');
  });

  it('should work with a function that returns an object', () => {
    const handler = (n: number) => ({ result: n * 2 });
    const input = 10;
    const result = pipe.transform(handler, input);

    expect(result).toEqual({ result: 20 });
  });
});
