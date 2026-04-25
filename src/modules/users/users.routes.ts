import { Router } from 'express';
import { catchAsync } from '@/common/helpers/catch-async';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';

import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema
} from './users.schemas';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

const router = Router();

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
router.get('/', authMiddleware, catchAsync(usersController.getUsers));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
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
 *         description: User fetched successfully
 */
router.get(
  '/:id',
  authMiddleware,
  validate(userIdParamSchema),
  catchAsync(usersController.getUserById)
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Ahmad Alali
 *               email:
 *                 type: string
 *                 example: ahmad@wisal.jo
 *               phone:
 *                 type: string
 *                 example: "0791234567"
 *               password:
 *                 type: string
 *                 example: Admin@123456
 *               roleId:
 *                 type: string
 *                 example: cm123roleid
 *               hospitalId:
 *                 type: string
 *                 example: cm123hospitalid
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post(
  '/',
  authMiddleware,
  validate(createUserSchema),
  catchAsync(usersController.createUser)
);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user
 *     tags: [Users]
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
 *         description: User updated successfully
 */
router.patch(
  '/:id',
  authMiddleware,
  validate(updateUserSchema),
  catchAsync(usersController.updateUser)
);

/**
 * @swagger
 * /users/{id}/activate:
 *   patch:
 *     summary: Activate user
 *     tags: [Users]
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
 *         description: User activated successfully
 */
router.patch(
  '/:id/activate',
  authMiddleware,
  validate(userIdParamSchema),
  catchAsync(usersController.activateUser)
);

/**
 * @swagger
 * /users/{id}/deactivate:
 *   patch:
 *     summary: Deactivate user
 *     tags: [Users]
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
 *         description: User deactivated successfully
 */
router.patch(
  '/:id/deactivate',
  authMiddleware,
  validate(userIdParamSchema),
  catchAsync(usersController.deactivateUser)
);

export default router;