import { default as jwt } from 'jsonwebtoken';

export const signToken = ({ payload, secret, options }: any) => jwt.sign(payload, secret, options);

export const verifyToken = ({ token, secret }: any) => jwt.verify(token, secret);
