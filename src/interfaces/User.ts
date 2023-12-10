import { User } from '@prisma/client';

export interface IUserWithTokens {
  tokens: {
    refreshToken: string;
    acccesToken: string;
  };
  user: User;
}
