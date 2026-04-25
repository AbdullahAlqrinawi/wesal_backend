import { z } from 'zod';

export const createApprovalSchema = z.object({
  body: z.object({
    type: z.enum([
      'HOSPITAL_REGISTRATION',
      'CAMPAIGN',
      'USER_ACCESS',
      'DONOR_VERIFICATION',
      'SETTINGS_CHANGE',
      'OTHER'
    ]),
    entityType: z.string().min(2).max(100),
    entityId: z.string().min(1),
    priority: z.string().max(50).optional(),
    notes: z.string().max(1000).optional(),
    submittedByUserId: z.string().optional(),
    submittedByHospitalId: z.string().optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const updateApprovalSchema = z.object({
  body: z.object({
    priority: z.string().max(50).optional(),
    notes: z.string().max(1000).optional(),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'RETURNED']).optional(),
    reviewedByUserId: z.string().optional()
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const decisionApprovalSchema = z.object({
  body: z.object({
    reviewedByUserId: z.string().min(1),
    notes: z.string().max(1000).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const approvalIdParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});