import functions from '../../src/functions';

describe('PONG TEST', () => {
  jest.setTimeout(10000);
  it('The answer should be "pong"', async (done) => {
    expect(functions.pong.sayPong()).toBe('pong');
    done();
  });
});
