import { default as mocks } from '../../__mocks__';
import controllers from '../../src/controllers';
import functions from '../../src/functions';

const authController: any = controllers.auth();
const mockAuth = mocks.controllers.auth;

let initialToken: string;
beforeAll(async (done) => {
  initialToken = await authController.createSignToken({ user: mockAuth.user, jwt: mockAuth.jwt });
  done();
});

describe('JWT TEST', () => {
  jest.setTimeout(10000);
  it('The initialToken should return a token string', async (done) => {
    expect(initialToken).toBeTruthy();
    done();
  });

  it('The initialToken should be TRUE', async (done) => {
    const verifyToken: any = functions.jwt.verifyToken({
      token: initialToken,
      secret: mockAuth.jwt.secret,
    });
    expect(verifyToken).toMatchObject({
      iat: expect.any(Number),
      id: expect.any(String),
    });

    expect(verifyToken.id).toBe(mockAuth.user.id);
    done();
  });
});
