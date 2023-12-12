import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, secret: number) => {
  const salt = await bcrypt.genSalt(secret);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
