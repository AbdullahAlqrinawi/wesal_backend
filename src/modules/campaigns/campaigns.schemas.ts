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

export const createCampaignSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(150),
    description: z.string().max(2000).optional(),
    organizerType: z.enum(['MOH', 'HOSPITAL']),
    organizerHospitalId: z.string().optional(),
    city: z.string().min(2).max(100),
    region: z.string().min(2).max(100),
    targetBloodTypes: z.array(z.enum(bloodTypes)).optional(),
    targetUnits: z.number().int().min(1).optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    createdByUserId: z.string().optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const updateCampaignSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(150).optional(),
    description: z.string().max(2000).optional(),
    city: z.string().min(2).max(100).optional(),
    region: z.string().min(2).max(100).optional(),
    targetBloodTypes: z
      .array(
        z.enum([
          'A_POS',
          'A_NEG',
          'B_POS',
          'B_NEG',
          'AB_POS',
          'AB_NEG',
          'O_POS',
          'O_NEG'
        ])
      )
      .optional(),
    targetUnits: z.number().int().min(1).optional(),
    collectedUnits: z.number().int().min(0).optional(),
    participantsCount: z.number().int().min(0).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED']).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const campaignIdParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});