import { default as mocks } from '../../__mocks__';
import functions from '../../src/functions';

const mockBcrypt = mocks.functions.bcrypt;

describe('BCRYPT TEST', () => {
  jest.setTimeout(10000);
  it('The password comparision should be TRUE', async (done) => {
    const password: string = mockBcrypt.password;
    const hashedPassword = await functions.bcrypt.hashPassword({ password });
    const compare = await functions.bcrypt.comparePasswords({ password, hashedPassword });
    expect(compare).toBe(true);
    done();
  });
});
