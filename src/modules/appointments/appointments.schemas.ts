import { z } from 'zod';

export const createAppointmentSchema = z.object({
  body: z.object({
    donorId: z.string().min(1),
    hospitalId: z.string().min(1),
    campaignId: z.string().optional(),
    appointmentDate: z.string().datetime(),
    startTime: z.string().min(1).optional(),
    endTime: z.string().min(1).optional(),
    source: z.enum(['DONOR_APP', 'HOSPITAL_PORTAL', 'MOH_PORTAL']),
    notes: z.string().max(500).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const updateAppointmentSchema = z.object({
  body: z.object({
    appointmentDate: z.string().datetime().optional(),
    startTime: z.string().min(1).optional(),
    endTime: z.string().min(1).optional(),
    status: z.enum(['BOOKED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
    notes: z.string().max(500).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});

export const appointmentIdParamSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string().min(1)
  })
});