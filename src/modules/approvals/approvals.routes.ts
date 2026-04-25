import { Router } from 'express';
import { catchAsync } from '@/common/helpers/catch-async';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';

import {
  approvalIdParamSchema,
  createApprovalSchema,
  decisionApprovalSchema,
  updateApprovalSchema
} from './approvals.schemas';
import { ApprovalsRepository } from './approvals.repository';
import { ApprovalsService } from './approvals.service';
import { ApprovalsController } from './approvals.controller';

const router = Router();

const approvalsRepository = new ApprovalsRepository();
const approvalsService = new ApprovalsService(approvalsRepository);
const approvalsController = new ApprovalsController(approvalsService);

/**
 * @swagger
 * tags:
 *   name: Approvals
 *   description: Approval management APIs
 */

/**
 * @swagger
 * /approvals:
 *   get:
 *     summary: Get all approvals
 *     tags: [Approvals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Approvals fetched successfully
 */
router.get('/', authMiddleware, catchAsync(approvalsController.getApprovals));

/**
 * @swagger
 * /approvals/{id}:
 *   get:
 *     summary: Get approval by id
 *     tags: [Approvals]
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
 *         description: Approval fetched successfully
 */
router.get(
  '/:id',
  authMiddleware,
  validate(approvalIdParamSchema),
  catchAsync(approvalsController.getApprovalById)
);

/**
 * @swagger
 * /approvals:
 *   post:
 *     summary: Create approval
 *     tags: [Approvals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - entityType
 *               - entityId
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [HOSPITAL_REGISTRATION, CAMPAIGN, USER_ACCESS, DONOR_VERIFICATION, SETTINGS_CHANGE, OTHER]
 *                 example: CAMPAIGN
 *               entityType:
 *                 type: string
 *                 example: campaign
 *               entityId:
 *                 type: string
 *               priority:
 *                 type: string
 *                 example: HIGH
 *               notes:
 *                 type: string
 *                 example: Awaiting MOH review
 *               submittedByUserId:
 *                 type: string
 *               submittedByHospitalId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Approval created successfully
 */
router.post(
  '/',
  authMiddleware,
  validate(createApprovalSchema),
  catchAsync(approvalsController.createApproval)
);

/**
 * @swagger
 * /approvals/{id}:
 *   patch:
 *     summary: Update approval
 *     tags: [Approvals]
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
 *         description: Approval updated successfully
 */
router.patch(
  '/:id',
  authMiddleware,
  validate(updateApprovalSchema),
  catchAsync(approvalsController.updateApproval)
);

/**
 * @swagger
 * /approvals/{id}/approve:
 *   patch:
 *     summary: Approve approval request
 *     tags: [Approvals]
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
 *               - reviewedByUserId
 *             properties:
 *               reviewedByUserId:
 *                 type: string
 *               notes:
 *                 type: string
 *                 example: Approved by ministry reviewer
 *     responses:
 *       200:
 *         description: Approval approved successfully
 */
router.patch(
  '/:id/approve',
  authMiddleware,
  validate(decisionApprovalSchema),
  catchAsync(approvalsController.approveApproval)
);

/**
 * @swagger
 * /approvals/{id}/reject:
 *   patch:
 *     summary: Reject approval request
 *     tags: [Approvals]
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
 *               - reviewedByUserId
 *             properties:
 *               reviewedByUserId:
 *                 type: string
 *               notes:
 *                 type: string
 *                 example: Rejected due to incomplete data
 *     responses:
 *       200:
 *         description: Approval rejected successfully
 */
router.patch(
  '/:id/reject',
  authMiddleware,
  validate(decisionApprovalSchema),
  catchAsync(approvalsController.rejectApproval)
);

export default router;