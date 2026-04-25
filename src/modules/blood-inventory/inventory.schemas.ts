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

export const createInventorySchema = z.object({
  body: z.object({
    hospitalId: z.string().min(1),
    bloodType: z.enum(bloodTypes),
    unitsAvailable: z.number().int().min(0),
    minimumThreshold: z.number().int().min(0)
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const updateInventorySchema = z.object({
  body: z.object({
    unitsAvailable: z.number().int().min(0).optional(),
    minimumThreshold: z.number().int().min(0).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const adjustInventorySchema = z.object({
  body: z.object({
    units: z.number().int(),
    type: z.enum([
      'DONATION_IN',
      'REQUEST_OUT',
      'ADJUSTMENT',
      'EXPIRED_REMOVAL',
      'TRANSFER_IN',
      'TRANSFER_OUT'
    ]),
    notes: z.string().max(500).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const inventoryIdParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});