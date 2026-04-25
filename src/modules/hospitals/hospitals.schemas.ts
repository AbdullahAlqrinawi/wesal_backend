import { z } from 'zod';

export const createHospitalSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150),
    city: z.string().min(2).max(100),
    region: z.string().min(2).max(100),
    address: z.string().max(255).optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    phone: z.string().min(8).max(20).optional(),
    email: z.string().email().optional(),
    bloodBankEnabled: z.boolean().optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const updateHospitalSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150).optional(),
    city: z.string().min(2).max(100).optional(),
    region: z.string().min(2).max(100).optional(),
    address: z.string().max(255).optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    phone: z.string().min(8).max(20).optional(),
    email: z.string().email().nullable().optional(),
    bloodBankEnabled: z.boolean().optional(),
    status: z
      .enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_APPROVAL'])
      .optional(),
    approvalStatus: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'RETURNED']).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const hospitalIdParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});