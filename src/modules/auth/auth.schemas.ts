import { z } from 'zod';

export const registerDonorSchema = z.object({
  body: z.object({
    fullName: z.string().min(3).max(100),
    nationalId: z.string().min(5).max(30),
    phone: z.string().min(8).max(20),
    email: z.string().email().optional(),
    password: z.string().min(6).max(100),
    bloodType: z.enum([
      'A_POS',
      'A_NEG',
      'B_POS',
      'B_NEG',
      'AB_POS',
      'AB_NEG',
      'O_POS',
      'O_NEG'
    ]),
    gender: z.string().min(1).max(20),
    birthDate: z.string().datetime(),
    city: z.string().min(2).max(100),
    region: z.string().min(2).max(100),
    address: z.string().max(255).optional(),
    weightKg: z.number().positive().optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const loginSchema = z.object({
  body: z.object({
    accountType: z.enum(['USER', 'DONOR']),
    email: z.string().email().optional(),
    phone: z.string().min(8).max(20).optional(),
    password: z.string().min(6).max(100)
  }).superRefine((data, ctx) => {
    if (!data.email && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Either email or phone is required',
        path: ['email']
      });
    }
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1)
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});