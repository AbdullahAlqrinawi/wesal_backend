import { Router } from 'express';

import { validate } from '@/middlewares/validate.middleware';
import { catchAsync } from '@/common/helpers/catch-async';

import {
  loginSchema,
  refreshTokenSchema,
  registerDonorSchema
} from './auth.schemas';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register-donor:
 *   post:
 *     summary: Register a new donor
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - nationalId
 *               - phone
 *               - password
 *               - bloodType
 *               - gender
 *               - birthDate
 *               - city
 *               - region
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Abdullah Test
 *               nationalId:
 *                 type: string
 *                 example: "123456789"
 *               phone:
 *                 type: string
 *                 example: "0799999999"
 *               email:
 *                 type: string
 *                 example: abdullah@test.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               bloodType:
 *                 type: string
 *                 enum: [A_POS, A_NEG, B_POS, B_NEG, AB_POS, AB_NEG, O_POS, O_NEG]
 *                 example: O_POS
 *               gender:
 *                 type: string
 *                 example: male
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2000-01-01T00:00:00.000Z
 *               city:
 *                 type: string
 *                 example: Amman
 *               region:
 *                 type: string
 *                 example: Amman
 *               address:
 *                 type: string
 *                 example: Test Address
 *               weightKg:
 *                 type: number
 *                 example: 75
 *     responses:
 *       201:
 *         description: Donor registered successfully
 */
router.post(
  '/register-donor',
  validate(registerDonorSchema),
  catchAsync(authController.registerDonor)
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login for user or donor
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accountType
 *               - password
 *             properties:
 *               accountType:
 *                 type: string
 *                 enum: [USER, DONOR]
 *                 example: DONOR
 *               email:
 *                 type: string
 *                 example: abdullah@test.com
 *               phone:
 *                 type: string
 *                 example: "0799999999"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  '/login',
  validate(loginSchema),
  catchAsync(authController.login)
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: your_refresh_token_here
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.post(
  '/refresh',
  validate(refreshTokenSchema),
  catchAsync(authController.refreshToken)
);

export default router;