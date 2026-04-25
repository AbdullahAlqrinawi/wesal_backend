import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '@/config/env';

type JwtPayload = {
  sub: string;
  role?: string;
  accountType?: 'USER' | 'DONOR';
  hospitalId?: string | null;
};

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn as SignOptions['expiresIn']
  });
}

export function signRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn as SignOptions['expiresIn']
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtAccessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
}