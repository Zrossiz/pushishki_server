export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

export interface IUserWithTokens {
  tokens: {
    refreshToken: string;
    acccesToken: string;
  };
  user: IUser;
}
