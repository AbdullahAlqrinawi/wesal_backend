import { Router } from 'express';
import { catchAsync } from '@/common/helpers/catch-async';
import { authMiddleware } from '@/middlewares/auth.middleware';

import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

const router = Router();

const rolesRepository = new RolesRepository();
const rolesService = new RolesService(rolesRepository);
const rolesController = new RolesController(rolesService);

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Roles and permissions management
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles fetched successfully
 */
router.get('/', authMiddleware, catchAsync(rolesController.getRoles));

/**
 * @swagger
 * /roles/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
 */
router.get(
  '/permissions',
  authMiddleware,
  catchAsync(rolesController.getPermissions)
);

export default router;