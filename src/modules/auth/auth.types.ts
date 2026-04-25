export type LoginAccountType = 'USER' | 'DONOR';

export type AuthTokenPayload = {
  sub: string;
  role?: string;
  accountType: LoginAccountType;
  hospitalId?: string | null;
};

export type AuthUserResult = {
  id: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  role?: string;
  accountType: LoginAccountType;
  hospitalId?: string | null;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  user: AuthUserResult;
  tokens: AuthTokens;
};