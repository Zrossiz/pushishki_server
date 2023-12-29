import { User } from '@prisma/client';

export interface IUserWithToken {
  user: User;
  token: string;
}
