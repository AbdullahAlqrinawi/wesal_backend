import { Router } from 'express';
import { catchAsync } from '@/common/helpers/catch-async';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';

import {
  bloodRequestIdParamSchema,
  createBloodRequestSchema,
  fulfillBloodRequestSchema,
  updateBloodRequestSchema
} from './blood-requests.schemas';
import { BloodRequestsRepository } from './blood-requests.repository';
import { BloodRequestsService } from './blood-requests.service';
import { BloodRequestsController } from './blood-requests.controller';

const router = Router();

const bloodRequestsRepository = new BloodRequestsRepository();
const bloodRequestsService = new BloodRequestsService(bloodRequestsRepository);
const bloodRequestsController = new BloodRequestsController(bloodRequestsService);

/**
 * @swagger
 * tags:
 *   name: Blood Requests
 *   description: Blood request management APIs
 */

/**
 * @swagger
 * /blood-requests:
 *   get:
 *     summary: Get all blood requests
 *     tags: [Blood Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blood requests fetched successfully
 */
router.get('/', authMiddleware, catchAsync(bloodRequestsController.getBloodRequests));

/**
 * @swagger
 * /blood-requests/{id}:
 *   get:
 *     summary: Get blood request by id
 *     tags: [Blood Requests]
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
 *         description: Blood request fetched successfully
 */
router.get(
  '/:id',
  authMiddleware,
  validate(bloodRequestIdParamSchema),
  catchAsync(bloodRequestsController.getBloodRequestById)
);

/**
 * @swagger
 * /blood-requests:
 *   post:
 *     summary: Create blood request
 *     tags: [Blood Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hospitalId
 *               - bloodType
 *               - unitsRequested
 *               - priority
 *             properties:
 *               hospitalId:
 *                 type: string
 *               bloodType:
 *                 type: string
 *                 enum: [A_POS, A_NEG, B_POS, B_NEG, AB_POS, AB_NEG, O_POS, O_NEG]
 *                 example: O_NEG
 *               unitsRequested:
 *                 type: integer
 *                 example: 4
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH, CRITICAL, EMERGENCY]
 *                 example: EMERGENCY
 *               caseType:
 *                 type: string
 *                 example: Emergency surgery
 *               patientAge:
 *                 type: integer
 *                 example: 45
 *               notes:
 *                 type: string
 *                 example: Urgent requirement
 *               neededBy:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-04-25T12:00:00.000Z
 *     responses:
 *       201:
 *         description: Blood request created successfully
 */
router.post(
  '/',
  authMiddleware,
  validate(createBloodRequestSchema),
  catchAsync(bloodRequestsController.createBloodRequest)
);

/**
 * @swagger
 * /blood-requests/{id}:
 *   patch:
 *     summary: Update blood request
 *     tags: [Blood Requests]
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
 *         description: Blood request updated successfully
 */
router.patch(
  '/:id',
  authMiddleware,
  validate(updateBloodRequestSchema),
  catchAsync(bloodRequestsController.updateBloodRequest)
);

/**
 * @swagger
 * /blood-requests/{id}/fulfill:
 *   patch:
 *     summary: Fulfill blood request partially or fully
 *     tags: [Blood Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - unitsFulfilledNow
 *             properties:
 *               unitsFulfilledNow:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Blood request fulfilled successfully
 */
router.patch(
  '/:id/fulfill',
  authMiddleware,
  validate(fulfillBloodRequestSchema),
  catchAsync(bloodRequestsController.fulfillBloodRequest)
);

export default router;