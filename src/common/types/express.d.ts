import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    auth?: {
      sub: string;
      role?: string;
      accountType: 'USER' | 'DONOR';
      hospitalId?: string | null;
    };
  }
}