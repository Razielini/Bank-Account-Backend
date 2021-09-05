import { default as mocks } from '../../__mocks__';
import functions from '../../src/functions';

let initialToken: string;
const mockJwt = mocks.functions.jwt;
beforeAll(() => {
  initialToken = functions.jwt.signToken(mockJwt);
});

describe('JWT TEST', () => {
  jest.setTimeout(10000);
  it('The signToken should return a token string', async (done) => {
    expect(initialToken).toBeTruthy();
    done();
  });

  it('The signToken should be TRUE', async (done) => {
    const verifyToken: any = functions.jwt.verifyToken({
      token: initialToken,
      secret: mockJwt.secret,
    });
    expect(verifyToken).toMatchObject({
      iat: expect.any(Number),
      id: expect.any(String),
    });

    expect(verifyToken.id).toBe(mockJwt.payload.id);
    done();
  });
});
