import { Router } from 'express';
import { catchAsync } from '@/common/helpers/catch-async';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';

import {
  createHospitalSchema,
  hospitalIdParamSchema,
  updateHospitalSchema
} from './hospitals.schemas';
import { HospitalsRepository } from './hospitals.repository';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';

const router = Router();

const hospitalsRepository = new HospitalsRepository();
const hospitalsService = new HospitalsService(hospitalsRepository);
const hospitalsController = new HospitalsController(hospitalsService);

/**
 * @swagger
 * tags:
 *   name: Hospitals
 *   description: Hospital management APIs
 */

/**
 * @swagger
 * /hospitals:
 *   get:
 *     summary: Get all hospitals
 *     tags: [Hospitals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hospitals fetched successfully
 */
router.get('/', authMiddleware, catchAsync(hospitalsController.getHospitals));

/**
 * @swagger
 * /hospitals/{id}:
 *   get:
 *     summary: Get hospital by id
 *     tags: [Hospitals]
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
 *         description: Hospital fetched successfully
 */
router.get(
  '/:id',
  authMiddleware,
  validate(hospitalIdParamSchema),
  catchAsync(hospitalsController.getHospitalById)
);

/**
 * @swagger
 * /hospitals:
 *   post:
 *     summary: Create new hospital
 *     tags: [Hospitals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - city
 *               - region
 *             properties:
 *               name:
 *                 type: string
 *                 example: Al Bashir Hospital
 *               city:
 *                 type: string
 *                 example: Amman
 *               region:
 *                 type: string
 *                 example: Amman
 *               address:
 *                 type: string
 *                 example: Amman, Jordan
 *               latitude:
 *                 type: number
 *                 example: 31.9454
 *               longitude:
 *                 type: number
 *                 example: 35.9284
 *               phone:
 *                 type: string
 *                 example: "065000000"
 *               email:
 *                 type: string
 *                 example: contact@hospital.jo
 *               bloodBankEnabled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Hospital created successfully
 */
router.post(
  '/',
  authMiddleware,
  validate(createHospitalSchema),
  catchAsync(hospitalsController.createHospital)
);

/**
 * @swagger
 * /hospitals/{id}:
 *   patch:
 *     summary: Update hospital
 *     tags: [Hospitals]
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
 *         description: Hospital updated successfully
 */
router.patch(
  '/:id',
  authMiddleware,
  validate(updateHospitalSchema),
  catchAsync(hospitalsController.updateHospital)
);

/**
 * @swagger
 * /hospitals/{id}/activate:
 *   patch:
 *     summary: Activate hospital
 *     tags: [Hospitals]
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
 *         description: Hospital activated successfully
 */
router.patch(
  '/:id/activate',
  authMiddleware,
  validate(hospitalIdParamSchema),
  catchAsync(hospitalsController.activateHospital)
);

/**
 * @swagger
 * /hospitals/{id}/deactivate:
 *   patch:
 *     summary: Deactivate hospital
 *     tags: [Hospitals]
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
 *         description: Hospital deactivated successfully
 */
router.patch(
  '/:id/deactivate',
  authMiddleware,
  validate(hospitalIdParamSchema),
  catchAsync(hospitalsController.deactivateHospital)
);

export default router;