import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: '*',
  credentials: true
};

export const corsMiddleware = cors(corsOptions);