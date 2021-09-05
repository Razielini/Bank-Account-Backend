import functions from '../functions';

const authController = () => {
  const createSignToken = async ({ user, jwt }: any) => {
    const tokenObject = signTokenObject({ user, jwt });
    const token = await signToken(tokenObject);
    return token;
  };

  const signToken = async ({ payload, secret, options }: any) =>
    functions.jwt.signToken({ payload, secret, options });

  const signTokenObject = ({ user, jwt: { secret, expiresIn } }: any) => {
    const signTokenObject = {
      payload: {
        id: user.id,
      },
      secret,
      options: {
        expiresIn,
      },
    };

    return signTokenObject;
  };

  const compareRawPassword = ({ password, confirmPassword }: any) => password === confirmPassword;

  return {
    signToken,
    signTokenObject,
    createSignToken,
    compareRawPassword,
  };
};

export default authController;
