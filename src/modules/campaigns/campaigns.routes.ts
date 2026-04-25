import { Router } from 'express';
import { catchAsync } from '@/common/helpers/catch-async';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';

import {
  campaignIdParamSchema,
  createCampaignSchema,
  updateCampaignSchema
} from './campaigns.schemas';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';

const router = Router();

const campaignsRepository = new CampaignsRepository();
const campaignsService = new CampaignsService(campaignsRepository);
const campaignsController = new CampaignsController(campaignsService);

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: Campaign management APIs
 */

/**
 * @swagger
 * /campaigns:
 *   get:
 *     summary: Get all campaigns
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Campaigns fetched successfully
 */
router.get('/', authMiddleware, catchAsync(campaignsController.getCampaigns));

/**
 * @swagger
 * /campaigns/{id}:
 *   get:
 *     summary: Get campaign by id
 *     tags: [Campaigns]
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
 *         description: Campaign fetched successfully
 */
router.get(
  '/:id',
  authMiddleware,
  validate(campaignIdParamSchema),
  catchAsync(campaignsController.getCampaignById)
);

/**
 * @swagger
 * /campaigns:
 *   post:
 *     summary: Create campaign
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - organizerType
 *               - city
 *               - region
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Emergency Blood Donation Drive
 *               description:
 *                 type: string
 *                 example: Community donation campaign in Amman
 *               organizerType:
 *                 type: string
 *                 enum: [MOH, HOSPITAL]
 *                 example: HOSPITAL
 *               organizerHospitalId:
 *                 type: string
 *               city:
 *                 type: string
 *                 example: Amman
 *               region:
 *                 type: string
 *                 example: Amman
 *               targetBloodTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [A_POS, A_NEG, B_POS, B_NEG, AB_POS, AB_NEG, O_POS, O_NEG]
 *               targetUnits:
 *                 type: integer
 *                 example: 100
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-05-01T08:00:00.000Z
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-05-03T16:00:00.000Z
 *               createdByUserId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Campaign created successfully
 */
router.post(
  '/',
  authMiddleware,
  validate(createCampaignSchema),
  catchAsync(campaignsController.createCampaign)
);

/**
 * @swagger
 * /campaigns/{id}:
 *   patch:
 *     summary: Update campaign
 *     tags: [Campaigns]
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
 *         description: Campaign updated successfully
 */
router.patch(
  '/:id',
  authMiddleware,
  validate(updateCampaignSchema),
  catchAsync(campaignsController.updateCampaign)
);

/**
 * @swagger
 * /campaigns/{id}/publish:
 *   patch:
 *     summary: Publish campaign
 *     tags: [Campaigns]
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
 *         description: Campaign published successfully
 */
router.patch(
  '/:id/publish',
  authMiddleware,
  validate(campaignIdParamSchema),
  catchAsync(campaignsController.publishCampaign)
);

/**
 * @swagger
 * /campaigns/{id}/cancel:
 *   patch:
 *     summary: Cancel campaign
 *     tags: [Campaigns]
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
 *         description: Campaign cancelled successfully
 */
router.patch(
  '/:id/cancel',
  authMiddleware,
  validate(campaignIdParamSchema),
  catchAsync(campaignsController.cancelCampaign)
);

export default router;