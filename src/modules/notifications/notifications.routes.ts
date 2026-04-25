import { Router } from 'express';
import { catchAsync } from '@/common/helpers/catch-async';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';

import {
  createNotificationSchema,
  notificationIdParamSchema
} from './notifications.schemas';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

const router = Router();

const notificationsRepository = new NotificationsRepository();
const notificationsService = new NotificationsService(notificationsRepository);
const notificationsController = new NotificationsController(notificationsService);

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notifications management APIs
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 */
router.get('/', authMiddleware, catchAsync(notificationsController.getNotifications));

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get notification by id
 *     tags: [Notifications]
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
 *         description: Notification fetched successfully
 */
router.get(
  '/:id',
  authMiddleware,
  validate(notificationIdParamSchema),
  catchAsync(notificationsController.getNotificationById)
);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientType
 *               - type
 *               - title
 *               - body
 *             properties:
 *               recipientType:
 *                 type: string
 *                 enum: [USER, DONOR, HOSPITAL]
 *                 example: DONOR
 *               userId:
 *                 type: string
 *               donorId:
 *                 type: string
 *               hospitalId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [EMERGENCY, CAMPAIGN, REMINDER, SYSTEM, ACHIEVEMENT, APPROVAL, APPOINTMENT]
 *                 example: APPOINTMENT
 *               title:
 *                 type: string
 *                 example: Appointment Reminder
 *               body:
 *                 type: string
 *                 example: Your donation appointment is tomorrow at 10:00 AM.
 *               data:
 *                 type: object
 *               channel:
 *                 type: string
 *                 enum: [IN_APP, PUSH, SMS, EMAIL]
 *                 example: IN_APP
 *     responses:
 *       201:
 *         description: Notification created successfully
 */
router.post(
  '/',
  authMiddleware,
  validate(createNotificationSchema),
  catchAsync(notificationsController.createNotification)
);

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     summary: Mark notification as read
 *     tags: [Notifications]
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
 *         description: Notification marked as read successfully
 */
router.patch(
  '/:id/read',
  authMiddleware,
  validate(notificationIdParamSchema),
  catchAsync(notificationsController.markAsRead)
);

export default router;