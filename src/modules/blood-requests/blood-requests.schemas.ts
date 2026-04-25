import { z } from 'zod';

const bloodTypes = [
  'A_POS',
  'A_NEG',
  'B_POS',
  'B_NEG',
  'AB_POS',
  'AB_NEG',
  'O_POS',
  'O_NEG'
] as const;

export const createBloodRequestSchema = z.object({
  body: z.object({
    hospitalId: z.string().min(1),
    bloodType: z.enum(bloodTypes),
    unitsRequested: z.number().int().min(1),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'EMERGENCY']),
    caseType: z.string().max(255).optional(),
    patientAge: z.number().int().min(0).optional(),
    notes: z.string().max(1000).optional(),
    neededBy: z.string().datetime().optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const updateBloodRequestSchema = z.object({
  body: z.object({
    unitsRequested: z.number().int().min(1).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'EMERGENCY']).optional(),
    status: z
      .enum(['PENDING', 'IN_PROGRESS', 'PARTIALLY_FULFILLED', 'FULFILLED', 'CANCELLED', 'REJECTED'])
      .optional(),
    caseType: z.string().max(255).optional(),
    patientAge: z.number().int().min(0).optional(),
    notes: z.string().max(1000).optional(),
    neededBy: z.string().datetime().optional()
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const fulfillBloodRequestSchema = z.object({
  body: z.object({
    unitsFulfilledNow: z.number().int().min(1)
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const bloodRequestIdParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});