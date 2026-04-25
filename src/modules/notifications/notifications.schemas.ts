import { z } from 'zod';

export const createNotificationSchema = z.object({
  body: z.object({
    recipientType: z.enum(['USER', 'DONOR', 'HOSPITAL']),
    userId: z.string().optional(),
    donorId: z.string().optional(),
    hospitalId: z.string().optional(),
    type: z.enum([
      'EMERGENCY',
      'CAMPAIGN',
      'REMINDER',
      'SYSTEM',
      'ACHIEVEMENT',
      'APPROVAL',
      'APPOINTMENT'
    ]),
    title: z.string().min(3).max(150),
    body: z.string().min(3).max(1000),
    data: z.record(z.any()).optional(),
    channel: z.enum(['IN_APP', 'PUSH', 'SMS', 'EMAIL']).optional()
  }).superRefine((data, ctx) => {
    if (data.recipientType === 'USER' && !data.userId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['userId'],
        message: 'userId is required when recipientType is USER'
      });
    }

    if (data.recipientType === 'DONOR' && !data.donorId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['donorId'],
        message: 'donorId is required when recipientType is DONOR'
      });
    }

    if (data.recipientType === 'HOSPITAL' && !data.hospitalId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['hospitalId'],
        message: 'hospitalId is required when recipientType is HOSPITAL'
      });
    }
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const notificationIdParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});