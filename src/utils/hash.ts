import bcrypt, { hashSync } from 'bcryptjs';

export const hashPassword = (password : string) =>bcrypt.hashSync(password, 10);
export const comparePassword = (input : string,hash : string) => bcrypt.compareSync(input,hash);
