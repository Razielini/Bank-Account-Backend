import { default as mocks } from '../../__mocks__';
import services from '../../src/services';

describe('AUTH TEST', () => {
  jest.setTimeout(10000);
  it('True should be true', async (done) => {
    expect(true).toBeTruthy();
    done();
  });
});
