import bcrypt from 'bcryptjs';
import { User } from '@/lib/models';

export async function createUser(email: string, pwd: string) {
  const hash = await bcrypt.hash(pwd, 12);
  return User.create({ email, password: hash });
}

export async function patchUser(id: string, data: any, nextStep: number) {
  return User.findByIdAndUpdate(
    id,
    { ...data, step: nextStep },
    { new: true }
  ).lean();
}
