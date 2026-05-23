import { AbbreviatedNumberPipe } from './abbreviated-number.pipe';

describe('AbbreviatedNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new AbbreviatedNumberPipe();

    expect(pipe).toBeTruthy();
  });
});
