export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

export interface UserWithTokens {
  tokens: {
    refreshToken: string;
    acccesToken: string;
  };
  user: User;
}
