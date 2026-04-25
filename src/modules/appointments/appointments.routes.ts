import { Router } from 'express';
import { catchAsync } from '@/common/helpers/catch-async';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';

import {
  appointmentIdParamSchema,
  createAppointmentSchema,
  updateAppointmentSchema
} from './appointments.schemas';
import { AppointmentsRepository } from './appointments.repository';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';

const router = Router();

const appointmentsRepository = new AppointmentsRepository();
const appointmentsService = new AppointmentsService(appointmentsRepository);
const appointmentsController = new AppointmentsController(appointmentsService);

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management APIs
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointments fetched successfully
 */
router.get('/', authMiddleware, catchAsync(appointmentsController.getAppointments));

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by id
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment fetched successfully
 */
router.get(
  '/:id',
  authMiddleware,
  validate(appointmentIdParamSchema),
  catchAsync(appointmentsController.getAppointmentById)
);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - donorId
 *               - hospitalId
 *               - appointmentDate
 *               - source
 *             properties:
 *               donorId:
 *                 type: string
 *               hospitalId:
 *                 type: string
 *               campaignId:
 *                 type: string
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-04-28T10:00:00.000Z
 *               startTime:
 *                 type: string
 *                 example: "10:00"
 *               endTime:
 *                 type: string
 *                 example: "10:30"
 *               source:
 *                 type: string
 *                 enum: [DONOR_APP, HOSPITAL_PORTAL, MOH_PORTAL]
 *                 example: DONOR_APP
 *               notes:
 *                 type: string
 *                 example: Morning appointment
 *     responses:
 *       201:
 *         description: Appointment created successfully
 */
router.post(
  '/',
  authMiddleware,
  validate(createAppointmentSchema),
  catchAsync(appointmentsController.createAppointment)
);

/**
 * @swagger
 * /appointments/{id}:
 *   patch:
 *     summary: Update appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 */
router.patch(
  '/:id',
  authMiddleware,
  validate(updateAppointmentSchema),
  catchAsync(appointmentsController.updateAppointment)
);

/**
 * @swagger
 * /appointments/{id}/cancel:
 *   patch:
 *     summary: Cancel appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 */
router.patch(
  '/:id/cancel',
  authMiddleware,
  validate(appointmentIdParamSchema),
  catchAsync(appointmentsController.cancelAppointment)
);

export default router;