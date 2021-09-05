import bcrypt from 'bcrypt';
export const hashPassword = async ({ password }: any) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
