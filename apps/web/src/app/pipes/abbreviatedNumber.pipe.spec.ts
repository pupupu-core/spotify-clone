import { AbbreviatedNumberPipe } from './abbreviatedNumber.pipe';

describe('AbbreviatedNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new AbbreviatedNumberPipe();

    expect(pipe).toBeTruthy();
  });
});
