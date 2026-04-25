import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(3).max(100),
    email: z.string().email(),
    phone: z.string().min(8).max(20).optional(),
    password: z.string().min(6).max(100),
    roleId: z.string().min(1),
    hospitalId: z.string().optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const updateUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(3).max(100).optional(),
    phone: z.string().min(8).max(20).optional(),
    roleId: z.string().min(1).optional(),
    hospitalId: z.string().nullable().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const userIdParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});