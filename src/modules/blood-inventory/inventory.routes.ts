import { Router } from 'express';
import { catchAsync } from '@/common/helpers/catch-async';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';

import {
  adjustInventorySchema,
  createInventorySchema,
  inventoryIdParamSchema,
  updateInventorySchema
} from './inventory.schemas';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

const router = Router();

const inventoryRepository = new InventoryRepository();
const inventoryService = new InventoryService(inventoryRepository);
const inventoryController = new InventoryController(inventoryService);

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Blood inventory management APIs
 */

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get all inventory records
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory fetched successfully
 */
router.get('/', authMiddleware, catchAsync(inventoryController.getAllInventory));

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     summary: Get inventory record by id
 *     tags: [Inventory]
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
 *         description: Inventory record fetched successfully
 */
router.get(
  '/:id',
  authMiddleware,
  validate(inventoryIdParamSchema),
  catchAsync(inventoryController.getInventoryById)
);

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Create inventory record
 *     tags: [Inventory]
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
 *               - unitsAvailable
 *               - minimumThreshold
 *             properties:
 *               hospitalId:
 *                 type: string
 *               bloodType:
 *                 type: string
 *                 enum: [A_POS, A_NEG, B_POS, B_NEG, AB_POS, AB_NEG, O_POS, O_NEG]
 *                 example: O_POS
 *               unitsAvailable:
 *                 type: integer
 *                 example: 45
 *               minimumThreshold:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Inventory record created successfully
 */
router.post(
  '/',
  authMiddleware,
  validate(createInventorySchema),
  catchAsync(inventoryController.createInventory)
);

/**
 * @swagger
 * /inventory/{id}:
 *   patch:
 *     summary: Update inventory record
 *     tags: [Inventory]
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
 *         description: Inventory record updated successfully
 */
router.patch(
  '/:id',
  authMiddleware,
  validate(updateInventorySchema),
  catchAsync(inventoryController.updateInventory)
);

/**
 * @swagger
 * /inventory/{id}/adjust:
 *   patch:
 *     summary: Adjust inventory units and create transaction
 *     tags: [Inventory]
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
 *               - units
 *               - type
 *             properties:
 *               units:
 *                 type: integer
 *                 example: 5
 *               type:
 *                 type: string
 *                 enum: [DONATION_IN, REQUEST_OUT, ADJUSTMENT, EXPIRED_REMOVAL, TRANSFER_IN, TRANSFER_OUT]
 *                 example: DONATION_IN
 *               notes:
 *                 type: string
 *                 example: Manual stock increase
 *     responses:
 *       200:
 *         description: Inventory adjusted successfully
 */
router.patch(
  '/:id/adjust',
  authMiddleware,
  validate(adjustInventorySchema),
  catchAsync(inventoryController.adjustInventory)
);

export default router;